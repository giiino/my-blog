import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Post } from '@/db/entity/Post'
import { ApiResponse } from '@/shared/types/api'
import { PostCardResponse } from '@/shared/types/api/post'
import { isVoid } from '@/shared/utils/check'
import { pick } from '@/shared/utils/format'

export async function getLatestPost() {
  const AppDataSource = await getDataSource()
  const postRepo = AppDataSource.getRepository(Post)
  const resultPost = await postRepo.find({
    where: {
      isReadme: 0,
      isDelete: 0
    },
    order: {
      createTime: 'DESC'
    },
    take: 6
  })

  if (isVoid(resultPost)) {
    return undefined
  }

  return resultPost.map((item: Post) =>
    pick(item, ['_id', 'title', 'content', 'coverImage', 'createTime'])
  ) as PostCardResponse[]
}

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<PostCardResponse[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  try {
    const data = await getLatestPost()

    if (isVoid(data)) {
      return res.status(404).json({ message: '未找到資料' })
    }

    return res.status(200).json({ result: data })
  } catch (error) {
    console.error('get latest error' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
