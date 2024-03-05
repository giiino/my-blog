import {
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'

export async function getMenuCategories() {
  const q = query(
    collectionGroup(db, 'post'),
    where('isReadme', '==', false),
    where('isDelete', '==', false),
    orderBy('category')
  )
  const querySnapshot = await getDocs(q)

  type ResultType = {
    [key: string]: {
      category: string
      titles: { title: string; id: string }[]
    }
  }

  const result = {} as ResultType
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    const category = data.category
    const title = { title: data.title, id: doc.id }

    if (!result[category]) {
      result[category] = { category, titles: [] }
    }

    result[category].titles.push(title)
  })

  const resultArray = Object.values(result).sort((a, b) =>
    a.category > b.category ? 1 : -1
  )

  return resultArray
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }
  try {
    const data = await getMenuCategories()
    return res.status(200).json(data)
  } catch (error) {
    console.error('get menu categories error' + error)
    return res.status(500).json({ message: '資料庫發生錯誤' })
  }
}
