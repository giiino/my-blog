import { ObjectId } from 'mongodb'
import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/pages/api'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<Article>
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const { id = '' } = req.query as { id: string }

  const { category = '', title = '', content = '', isReadme = false } = req.body

  try {
    const AppDataSource = await getDataSource()
    const articleRepo = AppDataSource.getRepository(Article)
    const objectId = new ObjectId(id)

    const targetArticle = await articleRepo.findOne({
      where: {
        _id: objectId
      }
    })

    if (!targetArticle) {
      return res.status(404).json({ message: '變更目標不存在' })
    }

    targetArticle.category = category
    targetArticle.title = title
    targetArticle.content = content
    targetArticle.isReadme = isReadme ? 1 : 0
    targetArticle.updateTime = Date.now()

    const resArticle = await articleRepo.save(targetArticle)
    console.log(resArticle)
    if (resArticle) {
      res.status(201).json({ message: '變更成功', result: resArticle })
    }
    return res.status(404).json({ message: '變更失敗' })
  } catch (error) {
    console.error('資料庫出錯' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
