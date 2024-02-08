import { ObjectId } from 'mongodb'
import { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Post } from '@/db/entity/Post'
import { ApiResponse } from '@/shared/types/api'
import { PostCardResponse } from '@/shared/types/api/post'
import { isVoid } from '@/shared/utils/check'
import { pick } from '@/shared/utils/format'

export async function getRelatedPosts(id: string) {
  const AppDataSource = await getDataSource()
  const postRepo = AppDataSource.getMongoRepository(Post)
  const objectId = new ObjectId(id)
  const currentPost = await postRepo.findOne({
    where: {
      _id: objectId,
      isDelete: 0
    }
  })

  if (isVoid(currentPost)) {
    throw Error('尋找關聯文章失敗，目標文章可能被刪出')
  }

  const { _id, category } = currentPost!

  const pipeline = [
    {
      $match: {
        category,
        _id: { $ne: _id },
        isDelete: 0
      }
    },
    {
      $sample: { size: 2 }
    }
  ]

  const result = await postRepo.aggregate(pipeline).toArray()

  return result.map((item: Post) =>
    pick(item, ['_id', 'title', 'content', 'coverImage', 'createTime'])
  ) as PostCardResponse[]
}

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<PostCardResponse[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  try {
    const { id } = req.query as { id: string }

    const data = await getRelatedPosts(id)
    return res.status(200).json(data)
  } catch (error) {
    console.error('get related error' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
