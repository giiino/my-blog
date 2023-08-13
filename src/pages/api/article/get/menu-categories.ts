import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/shared/types/api'
import { MenuCategoriesResponse } from '@/shared/types/api/article'

export async function getMenuCategories() {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getMongoRepository(Article)
  const result = await articleRepo
    .aggregate([
      {
        $match: {
          isReadme: 0,
          isDelete: 0
        }
      },
      {
        $group: {
          _id: '$category',
          titles: {
            $push: {
              title: '$title',
              _id: '$_id'
            }
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          titles: 1
        }
      }
    ])
    .toArray()
  return result as unknown as MenuCategoriesResponse[]
}

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<MenuCategoriesResponse[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }
  try {
    const data = await getMenuCategories()
    return res.status(200).json(data)
  } catch (error) {
    console.error('資料庫出錯' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
