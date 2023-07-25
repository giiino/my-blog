import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { id = '', category = '', title = '', content = '' } = req.body

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
  targetArticle.update_time = Date.now()

  const resArticle = await articleRepo.save(targetArticle)

  if (resArticle) {
    res.status(201).json({ message: '變更成功', result: resArticle })
  }
  return res.status(404).json({ message: '變更失敗' })
}
