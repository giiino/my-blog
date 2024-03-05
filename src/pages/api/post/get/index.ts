import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

import { db } from '@/db'
import { Post, PostResponse } from '@/shared/types/api/post'
import { exclude } from '@/shared/utils/format'

export async function getPostById(id: string, shouldPlusViews = false) {
  const docSnap = await getDoc(doc(db, 'post', id))

  if (!docSnap.exists()) {
    return undefined
  }

  const data = { id: docSnap.id, ...docSnap.data() } as Post

  if (shouldPlusViews) {
    updateDoc(doc(db, 'post', id), {
      views: data.views + 1
    })
  }

  return exclude(data, ['isDelete', 'views']) as PostResponse
}

export async function getReadmePost() {
  const q = query(
    collection(db, 'post'),
    where('isReadme', '==', true),
    where('isDelete', '==', false),
    limit(1)
  )
  const querySnapshot = await getDocs(q)
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))[0] as Post

  if (querySnapshot.empty) {
    return undefined
  }

  updateDoc(doc(db, 'post', data.id), {
    views: data.views + 1
  })

  return exclude(data, ['isDelete', 'views', 'isReadme']) as PostResponse
}
