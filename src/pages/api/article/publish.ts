import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'

import { ApiResponse } from '..'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<string>
) {
  if (req.method !== 'POST') {
    return res.status(405).end()   
  }

  const { category = '', title = '', content = '', isReadme = false } = req.body

  try {
    const AppDataSource = await getDataSource()
    const articleRepo = AppDataSource.getRepository(Article)

    const article = new Article()

    article.category = category
    article.title = title
    article.content = content
    article.isReadme = isReadme ? 1 : 0
    article.createTime = Date.now()
    article.updateTime = Date.now()

    const resArticle = await articleRepo.save(article)

    res
      .status(200)
      .json({ result: String(resArticle._id), message: '發布成功' })
  } catch (error) {
    console.error('資料庫出錯' + error)
    res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
