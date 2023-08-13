import { setCookie as set } from 'cookies-next'
import { NextApiRequest } from 'next'

import { ApiResponse } from '@/pages/api'

interface SetCookeProps {
  key: string
  value: string
  req: NextApiRequest
  res: ApiResponse<string>
}

export * from 'cookies-next'
export function setCookie({ key, value, req, res }: SetCookeProps) {
  set(key, value, {
    req,
    res,
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    path: '/'
  })
}
