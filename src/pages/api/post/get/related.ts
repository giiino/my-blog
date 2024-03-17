import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { pick } from '@/shared/utils/format'

export async function getRelatedPosts(id: string) {
  const docRef = doc(db, 'post', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists() || docSnap.data()?.isDelete === true) {
    throw new Error('未找到文章')
  }

  const q = query(
    collection(db, 'post'),
    where('category', '==', docSnap.data()?.category),
    where('isDelete', '==', false),
    where('__name__', '!=', id)
  )
  const relatedPostsSnapshot = await getDocs(q)

  return relatedPostsSnapshot.docs
    .map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...pick(data, ['title', 'coverImage', 'createTime'])
      }
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  try {
    const { id } = req.query as { id: string }

    const data = await getRelatedPosts(id)
    return res.status(200).json(data)
  } catch (error) {
    console.error('get related error' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
