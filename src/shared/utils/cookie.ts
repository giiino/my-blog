import { setCookie as set } from 'cookies-next'
import { OptionsType } from 'cookies-next/lib/types'
import { NextApiRequest } from 'next'

import { ApiResponse } from '@/shared/types/api'

interface SetCookeProps {
  key: string
  value: string
  req: NextApiRequest
  res: ApiResponse<string>
  options?: OptionsType
}

export * from 'cookies-next'
export function setCookie({ key, value, req, res, options }: SetCookeProps) {
  set(key, value, {
    req,
    res,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    ...options
  })
}
