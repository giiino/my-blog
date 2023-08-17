import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'
import { ApiResponse } from '@/shared/types/api'
import { ArticleResponse } from '@/shared/types/api/article'
import { exclude } from '@/shared/utils/format'

export async function getArticleById(id: string, shouldPlusViews = false) {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getRepository(Article)
  const objectId = new ObjectId(id)
  const resultArticle = await articleRepo.findOne({
    where: {
      _id: objectId,
      isDelete: 0
    }
  })

  if (!resultArticle) {
    return undefined
  }

  if (shouldPlusViews) {
    resultArticle.views = resultArticle.views + 1
    await articleRepo.save(resultArticle)
  }

  return exclude(resultArticle, [
    'isDelete',
    'views',
    'createTime'
  ]) as ArticleResponse
}

export async function getReadmeArticle() {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getRepository(Article)

  const resultArticle = await articleRepo.findOne({
    where: {
      isReadme: 1,
      isDelete: 0
    }
  })

  if (!resultArticle) {
    return undefined
  }

  resultArticle.views = resultArticle.views + 1
  await articleRepo.save(resultArticle)

  return exclude(resultArticle, [
    'isDelete',
    'views',
    'createTime',
    'isReadme'
  ]) as ArticleResponse
}

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<ArticleResponse>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  const { id = '' } = req.query

  try {
    const data = await getArticleById(Array.isArray(id) ? id[0] : id)

    if (!data) {
      return res.status(404).json({ message: '未找到資料' })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('資料庫出錯' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}