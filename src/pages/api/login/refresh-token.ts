import type { NextApiRequest } from 'next'

import * as constants from '@/shared/constants/auth'
import { ApiResponse } from '@/shared/types/api'
import type { UserInfo } from '@/shared/types/api/login'
import { setCookie } from '@/shared/utils/cookie'
import { pick, serialize } from '@/shared/utils/format'
import { generateJWT, getVerifiedJwtUser } from '@/shared/utils/jwt'

export default async function handler(
  req: NextApiRequest,
  res: ApiResponse<Partial<UserInfo>>
) {
  try {
    if (req.method !== 'POST') {
      res.status(405).end()
    }

    const userInfo = getVerifiedJwtUser({ req, res }, { isRefreshToken: true })
    if (!userInfo) {
      return res
        .status(403)
        .json({ message: 'refresh token is expired, please relogin' })
    }

    const jwtPayload = serialize(
      pick(userInfo, ['userName', 'isAdmin', 'avatar'])
    )
    const accessToken = generateJWT(
      jwtPayload,
      constants.ACCESS_TOKEN_EXPIRES_IN
    )
    setCookie({
      key: constants.ACCESS_TOKEN_COOKIE,
      value: accessToken,
      req,
      res
    })

    res.status(200).json({ message: 'refresh token completed' })
  } catch (error) {
    console.error('請求發生錯誤' + error)
    res.status(500).json({ message: '請求發生錯誤' })
  }
}
