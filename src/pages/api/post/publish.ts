import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { NextApiRequest } from 'next'

import { db } from '@/db'
import { ApiResponse } from '@/shared/types/api'
import { getVerifiedJwtUser, isAdmin } from '@/shared/utils/jwt'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<string>
) {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

  const {
    id = '',
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
      return res.status(403).json({ message: '權限不足，發布失敗' })
    }

    const docSnap = await getDoc(doc(db, 'post', id))

    if (docSnap.exists()) {
      return res.status(409).json({ message: '該id已存在' })
    }

    await setDoc(doc(db, 'post', id), {
      category,
      title,
      content,
      isReadme,
      isDelete: false,
      coverImage,
      views: 0,
      createTime: Date.now(),
      updateTime: Date.now()
    })
    return res.status(200).json({ message: '發布成功' })
  } catch (error) {
    console.error('publish error' + error)
    res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
