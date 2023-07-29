import { Article } from '@/db/entity/Article'

export type MenuCategoriesResponse = {
  category: string
  titles: Array<Record<'title' | '_id', string>>
}

export type ArticleResponse = Omit<
  Article,
  'create_time' | 'views' | 'is_delete'
>
export type ArticleEditResponse = Omit<
  Article,
  'update_time' | 'create_time' | 'views' | 'is_delete'
>
