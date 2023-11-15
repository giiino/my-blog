import type { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { User } from '@/db/entity/User'
import { ApiResponse } from '@/shared/types/api'
import type { UserInfo } from '@/shared/types/api/login'
import { pick } from '@/shared/utils/format'
import { getJwtUser } from '@/shared/utils/jwt'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<Partial<UserInfo>>
) {
  try {
    if (req.method !== 'GET') {
      res.status(405).end()
    }

    const userInfo = getJwtUser({ req, res })

    if (!userInfo) {
      return res.status(401).json({ message: '認證錯誤或是token不存在' })
    }

    const AppDataSource = await getDataSource()
    const articleRepo = await AppDataSource.getRepository(User).findOne({
      where: {
        userName: userInfo.userName
      }
    })

    if (!articleRepo) {
      return res.status(401).json({ message: '用戶已不存在' })
    }

    res.status(200).json(pick(userInfo, ['avatarImage', 'isAdmin', 'userName']))
  } catch (error) {
    console.error('請求發生錯誤' + error)
    res.status(500).json({ message: '請求發生錯誤' })
  }
}
