import { Article } from '@/db/entity/Article'

export const formatArticleResponse = (target: Partial<Article>) => {
  return {
    ...target,
    isReadme: target.isReadme === 1
  }
}
