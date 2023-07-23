import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { Article } from '@/db/entity/Article'

import { EditedItems } from './useEdit'

type PublishParams = EditedItems

type UpdateParams = EditedItems & {
  id: string
}

export const usePublishArticle = () => {
  return useMutation(
    (params: PublishParams) =>
      axios.post('/api/article/publish', { ...params }),
    {
      onSuccess: (res) => {}
    }
  )
}

export const useUpdateArticle = () => {
  return useMutation(
    (params: UpdateParams) => axios.post('/api/article/update', { ...params }),
    {
      onSuccess: (res) => {}
    }
  )
}
