import type { NextApiResponse } from 'next'

export type ApiResponse<T> = NextApiResponse<
  { message?: string; result?: T } | T
>
