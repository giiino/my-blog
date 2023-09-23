import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/shared/types/api'
import { isAdmin } from '@/shared/utils/jwt'
import { formatValidatorError, validate } from '@/shared/utils/validator'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<string>
) {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

  const {
    category = '',
    title = '',
    content = '',
    coverImage = '',
    isReadme = false
  } = req.body

  try {
    if (!isAdmin({ req, res })) {
      return res.status(403).json({ message: '權限不足，發布失敗' })
    }

    const AppDataSource = await getDataSource()
    const articleRepo = AppDataSource.getRepository(Article)

    const article = new Article()

    article.category = category
    article.title = title
    article.content = content
    article.isReadme = isReadme ? 1 : 0
    article.coverImage = coverImage
    article.createTime = Date.now()
    article.updateTime = Date.now()

    const errors = await validate(article)
    if (errors.length > 0) {
      return res.status(400).json({ message: formatValidatorError(errors) })
    } else {
      const resArticle = await articleRepo.save(article)
      return res
        .status(200)
        .json({ result: String(resArticle._id), message: '發布成功' })
    }
  } catch (error) {
    console.error('資料庫出錯' + error)
    res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
