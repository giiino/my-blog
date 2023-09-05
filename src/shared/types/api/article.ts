import { Article } from '@/db/entity/Article'

export type MenuCategoriesResponse = {
  category: string
  titles: Array<Record<'title' | '_id', string>>
}

export type ArticleResponse = Omit<Article, 'views' | 'isDelete'>
export type ArticleEditResponse = Omit<
  Article,
  'updateTime' | 'createTime' | 'views' | 'isDelete'
>

export type ArticleCardResponse = Pick<
  Article,
  '_id' | 'title' | 'content' | 'coverImage' | 'createTime'
>
