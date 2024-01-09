import axios from 'axios'
import { NextApiRequest } from 'next'

import { getDataSource } from '@/db'
import { User } from '@/db/entity/User'
import {
  GITHUB_ACCESS_TOKEN_URL,
  GITHUB_CLIENT_ID,
  GITHUB_USER_INFO_URL
} from '@/shared/constants/oauth'
import { setCookie } from '@/shared/utils/cookie'
import { serialize } from '@/shared/utils/format'
import { generateJWT } from '@/shared/utils/jwt'
import { formatValidatorError, validate } from '@/shared/utils/validator'

const clientID = GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

export default async function handler(req: NextApiRequest, res: any) {
  try {
    const { code, error } = req.query

    if (error) {
      return res.redirect(307, '/')
    }

    if (!code) {
      return res.status(401).json({
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

    const AppDataSource = await getDataSource()
    const articleRepo = AppDataSource.getRepository(User)
    const userInfo = await articleRepo.findOne({
      where: {
        identityType: 'GitHub',
        userName: login
      }
    })

    if (userInfo) {
      const token = generateJWT(serialize(userInfo))
      setCookie({
        key: 'token',
        value: token,
        req,
        res,
        options: {
          httpOnly: true
        }
      })
      setCookie({
        key: 'enabledFetchUserInfo',
        value: 'true',
        req,
        res,
        options: {
          httpOnly: false
        }
      })
      return res.redirect(307, '/')
    } else {
      const user = new User()

      user.userName = login
      user.avatar = avatar_url
      user.identityType = 'GitHub'
      user.createAt = Date.now()

      const errors = await validate(user)
      if (errors.length > 0) {
        return res.status(400).json({ message: formatValidatorError(errors) })
      } else {
        await articleRepo.save(user)
      }

      const token = generateJWT(serialize(userInfo))
      setCookie({ key: 'token', value: token, req, res })

      res.redirect(307, '/')
    }
  } catch (error) {
    console.error('OAUTH認證發生錯誤' + error)
    res.redirect(307, '/login/oauth/error')
  }
}
