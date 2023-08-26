import { setCookie as set } from 'cookies-next'
import { NextApiRequest } from 'next'

import { ApiResponse } from '@/shared/types/api'

interface SetCookeProps {
  key: string
  value: string
  req: NextApiRequest
  res: ApiResponse<string>
  disabledHttpOnly?: boolean
}

export * from 'cookies-next'
export function setCookie({
  key,
  value,
  req,
  res,
  disabledHttpOnly
}: SetCookeProps) {
  set(key, value, {
    req,
    res,
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: disabledHttpOnly ? false : true,
    path: '/'
  })
}
