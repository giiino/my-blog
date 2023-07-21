import type { NextApiRequest, NextApiResponse } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'

type ResponseData = {
  data: Article
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { category = '', title = '', content = '' } = req.body
  console.log('category, title, content', category, title, content)
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getRepository(Article)

  const article = new Article()

  article.category = category
  article.title = title
  article.content = content
  article.create_time = Date.now()
  article.update_time = Date.now()
  article.is_delete = 0

  const resArticle = await articleRepo.save(article)

  res.status(200).json({ data: resArticle, message: '發布成功' })
}
