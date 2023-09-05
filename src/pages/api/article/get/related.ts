import { ObjectId } from 'mongodb'
import { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/shared/types/api'
import { ArticleCardResponse } from '@/shared/types/api/article'
import { isVoid } from '@/shared/utils/check'
import { pick } from '@/shared/utils/format'

export async function getRelatedArticles(id: string) {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getMongoRepository(Article)
  const objectId = new ObjectId(id)
  const currentArticle = await articleRepo.findOne({
    where: {
      _id: objectId,
      isDelete: 0
    }
  })

  if (isVoid(currentArticle)) {
    throw Error('尋找關聯文章失敗，目標文章可能被刪出')
  }

  const { _id, category } = currentArticle!

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

  const result = await articleRepo.aggregate(pipeline).toArray()

  return result.map((item: Article) =>
    pick(item, ['_id', 'title', 'content', 'coverImage', 'createTime'])
  ) as ArticleCardResponse[]
}

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<ArticleCardResponse[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  try {
    const { id } = req.query as { id: string }

    const data = await getRelatedArticles(id)
    return res.status(200).json(data)
  } catch (error) {
    console.error('資料庫出錯' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
