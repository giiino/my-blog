import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/pages/api'
import { checkIsAdmin } from '@/shared/utils/jwt.util'

export async function getCategories() {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getMongoRepository(Article)
  const result: string[] = await articleRepo.distinct(
    'category',
    { isDelete: 0 },
    {}
  )
  return result
}

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<string[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  try {
    if (!checkIsAdmin({ req, res })) {
      return res.status(403).json({ message: '權限不足，獲取失敗' })
    }

    const data = await getCategories()
    return res.status(200).json(data)
  } catch (error) {
    console.error('資料庫出錯' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
