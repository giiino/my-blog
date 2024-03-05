import { collection, getDocs, query, where } from 'firebase/firestore'
import { NextApiRequest } from 'next'

import { db } from '@/db'
import { ApiResponse } from '@/shared/types/api'
import { getVerifiedJwtUser, isAdmin } from '@/shared/utils/jwt'

export async function getConverImages() {
  const postRef = collection(db, 'post')
  const q = query(postRef, where('isDelete', '==', false))
  const querySnapshot = await getDocs(q)

  const result = Array.from(
    new Set(querySnapshot.docs.map((doc) => doc.data().coverImage))
  )

  return result
}

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<string[]>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  try {
    if (!getVerifiedJwtUser({ req, res })) {
      return res.status(401).json({ message: '認證過期' })
    }

    if (!isAdmin({ req, res })) {
      return res.status(403).json({ message: '權限不足，獲取失敗' })
    }

    const data = await getConverImages()
    return res.status(200).json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: '資料獲取過程發生錯誤' })
  }
}
