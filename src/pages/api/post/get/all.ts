import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/db'
import { Post } from '@/shared/types/api/post'

export const getAllPosts = async () => {
  const postRef = collection(db, 'post')
  const querySnapshot = await getDocs(postRef)

  const result = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Post
    return { ...data, id: doc.id }
  })

  return result
}
