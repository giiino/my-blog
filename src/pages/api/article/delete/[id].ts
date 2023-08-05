import { ObjectId } from 'mongodb'
import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/pages/api'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<Article>
) {
  if (req.method !== 'DELETE') {
    return res.status(405).end()
  }

  const { id } = req.query as { id: string }

  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getRepository(Article)
  const objectId = new ObjectId(id)

  const targetArticle = await articleRepo.findOne({
    where: {
      _id: objectId
    }
  })

  if (!targetArticle) {
    return res.status(404).json({ message: '刪除目標不存在' })
  }

  targetArticle.isDelete = 1

  const resArticle = await articleRepo.save(targetArticle)

  if (resArticle) {
    res.status(201).json({ message: '刪除成功' })
  }
  return res.status(404).json({ message: '刪除失敗' })
}
