import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { isVoid } from '@/shared/utils/check'
import { pick } from '@/shared/utils/format'

export async function getLatestPost() {
  const postRef = collection(db, 'post')
  const q = query(
    postRef,
    where('isDelete', '==', false),
    where('isReadme', '==', false),
    orderBy('createTime', 'desc'),
    limit(6)
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      ...pick(data, ['title', 'coverImage', 'createTime'])
    }
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  try {
    const data = await getLatestPost()

    if (isVoid(data)) {
      return res.status(404).json({ message: '未找到資料' })
    }

    return res.status(200).json({ result: data })
  } catch (error) {
    console.error('get latest error' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
