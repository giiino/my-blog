import type { NextApiRequest, NextApiResponse } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'

import { MenuCategoriesResponse } from '.'
import { ApiResponse } from '..'

export async function getMenuCategories() {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getMongoRepository(Article)
  const result = await articleRepo
    .aggregate([
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
    return res.status(405).end()
  }

  const data = await getMenuCategories()

  res.status(200).json(data)
}
