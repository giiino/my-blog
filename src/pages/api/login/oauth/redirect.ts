import axios from 'axios'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where
} from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import * as constants from '@/shared/constants/auth'
import {
  GITHUB_ACCESS_TOKEN_URL,
  GITHUB_CLIENTid,
  GITHUB_USER_INFO_URL
} from '@/shared/constants/auth'
import { User } from '@/shared/types/api/login'
import { setCookie } from '@/shared/utils/cookie'
import { pick, serialize } from '@/shared/utils/format'
import { generateJWT } from '@/shared/utils/jwt'

const clientID = GITHUB_CLIENTid
const clientSecret = process.env.GITHUB_CLIENT_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code, error } = req.query

    if (error) {
      return res.redirect(307, '/')
    }

    if (!code) {
      return res.status(403).json({
        message: '認證code未提供，發生錯誤'
      })
    }

    const tokenResponse = await axios.post(GITHUB_ACCESS_TOKEN_URL, null, {
      params: {
        client_id: clientID,
        client_secret: clientSecret,
        code
      },
      headers: {
        accept: 'application/json'
      }
    })
    const accessToken = tokenResponse.data.access_token

    const githubUserInfo = await axios.get(GITHUB_USER_INFO_URL, {
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`
      }
    })

    const { login, avatar_url } = githubUserInfo.data

    const usersRef = collection(db, 'user')

    const q = query(
      usersRef,
      where('identityType', '==', 'GitHub'),
      where('userName', '==', login),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => doc.data())[0]

    if (!querySnapshot.empty) {
      const jwtPayload = serialize(
        pick(data, ['userName', 'isAdmin', 'avatar'])
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
      const refreshToken = generateJWT(
        jwtPayload,
        constants.REFRESH_TOKEN_EXPIRES_IN
      )
      setCookie({
        key: constants.REFRESH_TOKEN_COOKIE,
        value: refreshToken,
        req,
        res,
        options: {
          httpOnly: true,
          sameSite: 'strict'
        }
      })

      return res.redirect(307, '/')
    } else {
      const docRef = await addDoc(usersRef, {
        userName: login,
        avatar: avatar_url,
        identityType: 'GitHub',
        password: '',
        isAdmin: false,
        createAt: Date.now()
      })

      const newDocSnapshot = await getDoc(doc(db, 'user', docRef.id))

      const jwtPayload = serialize(
        pick(newDocSnapshot.data() as User, ['userName', 'isAdmin', 'avatar'])
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
      const refreshToken = generateJWT(
        jwtPayload,
        constants.REFRESH_TOKEN_EXPIRES_IN
      )
      setCookie({
        key: constants.REFRESH_TOKEN_COOKIE,
        value: refreshToken,
        req,
        res,
        options: {
          httpOnly: true,
          sameSite: 'strict'
        }
      })

      res.redirect(307, '/')
    }
  } catch (error) {
    console.error('OAUTH認證發生錯誤' + error)
    res.redirect(307, '/login/oauth/error')
  }
}
