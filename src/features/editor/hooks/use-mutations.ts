import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { Article } from '@/db/entity/Article'

import { EditedItems } from './useEdit'

export const usePublishArticle = () => {
  return useMutation(
    (params: EditedItems) => axios.post('/api/article/publish', { ...params }),
    {
      onSuccess: (res) => {}
    }
  )
}

export const useUpdateArticle = () => {
  return useMutation(
    (params: Partial<Article>) =>
      axios.post('/api/article/update', { ...params }),
    {
      onSuccess: (res) => {}
    }
  )
}
