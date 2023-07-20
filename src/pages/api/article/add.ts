import type { NextApiRequest, NextApiResponse } from 'next'

//import { mock } from "mockjs";
import { getDataSource } from '@/db'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({ data: 123 })
}
