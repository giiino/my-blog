import { doc, updateDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { getVerifiedJwtUser, isAdmin } from '@/shared/utils/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'DELETE') {
      res.status(405).end()
    }

    if (!getVerifiedJwtUser({ req, res })) {
      return res.status(401).json({ message: '認證過期' })
    }

    if (!isAdmin({ req, res })) {
      return res.status(403).json({ message: '權限不足，刪除失敗' })
    }

    const { id } = req.query as { id: string }

    const docRef = doc(db, 'post', id)
    await updateDoc(docRef, { isDelete: true })

    return res.status(200).json({ message: '變更成功' })
  } catch (error) {
    console.error('delete error' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
