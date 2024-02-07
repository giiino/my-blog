import { Post } from '@/db/entity/Post'

export const formatPostResponse = (target: Partial<Post>) => {
  return {
    ...target,
    isReadme: target?.isReadme === 1
  }
}
