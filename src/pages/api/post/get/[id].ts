import type { NextApiRequest } from 'next'

import { ApiResponse } from '@/shared/types/api'
import { PostResponse } from '@/shared/types/api/post'
import { exclude } from '@/shared/utils/format'

import { getPostById } from '.'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<Partial<PostResponse>>
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  const { id = '' } = req.query

  try {
    const data = await getPostById(Array.isArray(id) ? id[0] : id)

    if (!data) {
      return res.status(404).json({ message: '未找到資料' })
    }

    return res.status(200).json(exclude(data, ['updateTime', 'createTime']))
  } catch (error) {
    console.error('get post by id error: ' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
