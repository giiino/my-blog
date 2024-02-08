import { ObjectId } from 'mongodb'

import { getDataSource } from '@/db'
import { Post } from '@/db/entity/Post'
import { PostResponse } from '@/shared/types/api/post'
import { exclude } from '@/shared/utils/format'

export async function getPostById(id: string, shouldPlusViews = false) {
  const AppDataSource = await getDataSource()
  const postRepo = AppDataSource.getRepository(Post)
  const objectId = new ObjectId(id)

  const postResult = await postRepo.findOne({
    where: {
      _id: objectId,
      isDelete: 0
    }
  })

  if (!postResult) {
    return undefined
  }

  if (shouldPlusViews) {
    postResult.views = postResult.views + 1
    await postRepo.save(postResult)
  }

  return exclude(postResult, ['isDelete', 'views']) as PostResponse
}

export async function getReadmePost() {
  const AppDataSource = await getDataSource()
  const postRepo = AppDataSource.getRepository(Post)

  const resultPost = await postRepo.findOne({
    where: {
      isReadme: 1,
      isDelete: 0
    }
  })

  if (!resultPost) {
    return undefined
  }

  resultPost.views = resultPost.views + 1
  await postRepo.save(resultPost)

  return exclude(resultPost, ['isDelete', 'views', 'isReadme']) as PostResponse
}
