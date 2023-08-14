import { setCookie as set } from 'cookies-next'
import { NextApiRequest } from 'next'

import { ApiResponse } from '@/shared/types/api'

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
    maxAge: 7 * 24 * 60 * 60,
    httpOnly: true,
    path: '/'
  })
}
