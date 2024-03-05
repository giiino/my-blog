import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { pick } from '@/shared/utils/format'
import { getVerifiedJwtUser } from '@/shared/utils/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.status(405).end()
    }

    const userInfo = getVerifiedJwtUser({ req, res })

    if (!userInfo) {
      return res.status(401).json({ message: '認證錯誤或是token不存在' })
    }

    const q = query(
      collection(db, 'user'),
      where('identityType', '==', 'GitHub'),
      where('userName', '==', userInfo.userName),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => doc.data())[0]

    if (querySnapshot.empty) {
      return res.status(403).json({ message: '用戶已不存在' })
    }
    res.status(200).json(pick(data, ['avatar', 'isAdmin', 'userName']))
  } catch (error) {
    console.error('請求發生錯誤' + error)
    res.status(500).json({ message: '請求發生錯誤' })
  }
}
