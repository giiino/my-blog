import { getDataSource } from '@/db'
import { Post } from '@/db/entity/Post'

export async function getAllPosts() {
  const AppDataSource = await getDataSource()
  const postRepo = AppDataSource.getRepository(Post)
  const postResult = await postRepo.find()

  if (!postResult) {
    return undefined
  }

  return postResult
}
