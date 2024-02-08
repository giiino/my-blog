import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Post } from '@/db/entity/Post'
import { ApiResponse } from '@/shared/types/api'
import { getVerifiedJwtUser, isAdmin } from '@/shared/utils/jwt'
import { formatValidatorError, validate } from '@/shared/utils/validator'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<string>
) {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

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
      return res.status(403).json({ message: '權限不足，發布失敗' })
    }

    const AppDataSource = await getDataSource()
    const postRepo = AppDataSource.getRepository(Post)

    const post = new Post()

    post.category = category
    post.title = title
    post.content = content
    post.isReadme = isReadme ? 1 : 0
    post.coverImage = coverImage
    post.createTime = Date.now()
    post.updateTime = Date.now()

    const errors = await validate(post)
    if (errors.length > 0) {
      return res.status(400).json({ message: formatValidatorError(errors) })
    } else {
      const postReslt = await postRepo.save(post)
      return res
        .status(200)
        .json({ result: String(postReslt._id), message: '發布成功' })
    }
  } catch (error) {
    console.error('publish error' + error)
    res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
