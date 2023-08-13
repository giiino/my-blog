import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import type { UserInfo } from '@/pages/api/login'

import { getCookie } from './cookie.util'

const privateKey = process.env.JWT_PRIVATE_KEY!
const expiresIn = process.env.JWT_EXPIRES_IN!

export const generateJWT = (payload: string | object | Buffer) => {
  return jwt.sign(payload, privateKey, { expiresIn })
}

export const decodeAndVerifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, privateKey)
    return decoded
  } catch (error) {
    return null
  }
}

export const getJwtUser = ({ req, res }: any) => {
  const token = getCookie('token', {
    req,
    res
  }) as string

  return decodeAndVerifyJWT(token) as UserInfo | null
}

export const checkIsAdmin = ({ req, res }: any) => {
  const userInfo = getJwtUser({ req, res })
  return userInfo?.isAdmin === 1
}
