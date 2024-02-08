import { ObjectId } from 'mongodb'
import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Post } from '@/db/entity/Post'
import { ApiResponse } from '@/shared/types/api'
import { getVerifiedJwtUser, isAdmin } from '@/shared/utils/jwt'
import { formatValidatorError, validate } from '@/shared/utils/validator'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<Post>
) {
  if (req.method !== 'PUT') {
    res.status(405).end()
  }

  const { id = '' } = req.query as { id: string }

  const {
    category = '',
    title = '',
    content = '',
    coverImage = '',
    isReadme = false
  } = req.body

  try {
    if (!getVerifiedJwtUser({ req, res })) {
      return res.status(401).json({ message: '認證過期' })
    }

    if (!isAdmin({ req, res })) {
      return res.status(403).json({ message: '權限不足，更新失敗' })
    }

    const AppDataSource = await getDataSource()
    const postRepo = AppDataSource.getRepository(Post)
    const objectId = new ObjectId(id)

    const targetPost = await postRepo.findOne({
      where: {
        _id: objectId
      }
    })

    if (!targetPost) {
      return res.status(404).json({ message: '變更目標不存在' })
    }

    targetPost.category = category
    targetPost.title = title
    targetPost.content = content
    targetPost.coverImage = coverImage
    targetPost.isReadme = isReadme ? 1 : 0
    targetPost.updateTime = Date.now()

    const errors = await validate(targetPost)
    if (errors.length > 0) {
      return res.status(400).json({ message: formatValidatorError(errors) })
    } else {
      const postResult = await postRepo.save(targetPost)

      if (postResult) {
        return res.status(200).json({ message: '變更成功', result: postResult })
      }
      return res.status(404).json({ message: '變更失敗' })
    }
  } catch (error) {
    console.error('update error' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
