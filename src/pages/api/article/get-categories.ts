import type { NextApiRequest, NextApiResponse } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'

export async function getCategories() {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getMongoRepository(Article)
  const result = await articleRepo.distinct('category', {}, {})
  // const result2 = await articleRepo.find('category', {}, {})
  return result
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const data = await getCategories()

  res.status(200).json(data)
}
