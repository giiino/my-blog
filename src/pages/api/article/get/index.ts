import { ObjectId } from 'mongodb'
import type { NextApiRequest } from 'next'

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

  return exclude(resultArticle, ['isDelete', 'views']) as ArticleResponse
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
    'isReadme'
  ]) as ArticleResponse
}
