import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/shared/types/api'
import { ArticleCardResponse } from '@/shared/types/api/article'
import { isVoid } from '@/shared/utils/check'
import { pick } from '@/shared/utils/format'

export async function getLatestArticle() {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getRepository(Article)
  const resultArticle = await articleRepo.find({
    where: {
      isReadme: 0,
      isDelete: 0
    },
    order: {
      createTime: 'DESC'
    },
    take: 6
  })

  if (isVoid(resultArticle)) {
    return undefined
  }

  return resultArticle.map((item: Article) =>
    pick(item, ['_id', 'title', 'content', 'coverImage', 'createTime'])
  ) as ArticleCardResponse[]
}

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<ArticleCardResponse[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  try {
    const data = await getLatestArticle()

    if (isVoid(data)) {
      return res.status(404).json({ message: '未找到資料' })
    }

    return res.status(200).json({ result: data })
  } catch (error) {
    console.error('資料庫出錯' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
