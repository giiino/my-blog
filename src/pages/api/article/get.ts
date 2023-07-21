import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'

export async function getArticleById(id: string) {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getRepository(Article)
  const objectId = new ObjectId(id)
  const result = await articleRepo.findOne({
    where: {
      _id: objectId
    }
  })
  return result
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Article | null | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { id = '' } = req.query
  const data = await getArticleById(Array.isArray(id) ? id[0] : id)

  if (!data) {
    res.status(404).json({ message: '未找到資料' })
  }

  res.status(200).json(data)
}
