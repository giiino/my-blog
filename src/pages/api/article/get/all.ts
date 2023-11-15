import { getDataSource } from '@/db'
import { Article } from '@/db/entity/Article'

export async function getAllArticles() {
  const AppDataSource = await getDataSource()
  const articleRepo = AppDataSource.getRepository(Article)
  const resultArticle = await articleRepo.find()

  if (!resultArticle) {
    return undefined
  }

  return resultArticle
}
