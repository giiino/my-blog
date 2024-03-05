import jwt from 'jsonwebtoken'

import * as constants from '@/shared/constants/auth'
import type { UserInfo } from '@/shared/types/api/login'

import { getCookie } from './cookie'

const privateKey = process.env.JWT_PRIVATE_KEY!

export const generateJWT = (
  payload: string | object | Buffer,
  expiresIn?: string | number | undefined
) => {
  return jwt.sign(payload, privateKey, { expiresIn })
}

export const getVerifiedJwtUser = (
  { req, res }: any,
  { isRefreshToken }: { isRefreshToken?: boolean } = {}
) => {
  const cookie = isRefreshToken
    ? constants.REFRESH_TOKEN_COOKIE
    : constants.ACCESS_TOKEN_COOKIE

  const token = getCookie(cookie, {
    req,
    res
  }) as string

  if (!token) return null

  try {
    return jwt.verify(token, privateKey) as UserInfo
  } catch {
    return null
  }
}

export const isAdmin = ({ req, res }: any) => {
  const userInfo = getVerifiedJwtUser({ req, res })
  return userInfo?.isAdmin || process.env.NODE_ENV === 'development'
}
