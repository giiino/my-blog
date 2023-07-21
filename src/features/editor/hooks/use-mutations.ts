import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import type { EditedItems } from '../types'

export const usePublishArticle = () => {
  return useMutation(
    (params: EditedItems) => axios.post('/api/article/publish', { ...params }),
    {
      onSuccess: (res) => {
        console.log(res)
      }
    }
  )
}
