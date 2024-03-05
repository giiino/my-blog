import { doc, updateDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { getVerifiedJwtUser, isAdmin } from '@/shared/utils/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    res.status(405).end()
  }

  const { id = '' } = req.query as { id: string }

  const {
    category = '',
    title = '',
    content = '',
    coverImage = '',
    isReadme = false
  } = req.body

  try {
    if (!getVerifiedJwtUser({ req, res })) {
      return res.status(401).json({ message: '認證過期' })
    }

    if (!isAdmin({ req, res })) {
      return res.status(403).json({ message: '權限不足，更新失敗' })
    }

    await updateDoc(doc(db, 'post', id), {
      category,
      title,
      content,
      coverImage,
      isReadme,
      updateTime: Date.now()
    })
    return res.status(200).json({ message: '變更成功' })
  } catch (error) {
    console.error('update error' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
