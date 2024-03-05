export interface Post {
  id: string
  category: string
  content: string
  coverImage: string
  createTime: number
  isDelete: boolean
  isReadme: boolean
  title: string
  updateTime: number
  views: number
}

export type MenuCategoriesResponse = {
  category: string
  titles: Array<Record<'title' | 'id', string>>
}

export type PostResponse = Omit<Post, 'views' | 'isDelete'>
export type PostEditResponse = Omit<
  Post,
  'updateTime' | 'createTime' | 'views' | 'isDelete'
>

export type PostCardResponse = Pick<
  Post,
  'id' | 'title' | 'content' | 'coverImage' | 'createTime'
>
