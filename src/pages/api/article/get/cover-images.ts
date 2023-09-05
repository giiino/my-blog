import { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/shared/types/api'
import { isAdmin } from '@/shared/utils/jwt'

export async function getConverImages() {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getMongoRepository(Article)
  const result: string[] = await articleRepo.distinct(
    'coverImage',
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
    if (!isAdmin({ req, res })) {
      return res.status(403).json({ message: '權限不足，獲取失敗' })
    }

    const data = await getConverImages()
    return res.status(200).json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: '資料獲取過程發生錯誤' })
  }
}
