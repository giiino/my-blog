import { Post } from '@/db/entity/Post'

export type MenuCategoriesResponse = {
  category: string
  titles: Array<Record<'title' | '_id', string>>
}

export type PostResponse = Omit<Post, 'views' | 'isDelete'>
export type PostEditResponse = Omit<
  Post,
  'updateTime' | 'createTime' | 'views' | 'isDelete'
>

export type PostCardResponse = Pick<
  Post,
  '_id' | 'title' | 'content' | 'coverImage' | 'createTime'
>
