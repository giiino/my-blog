import { toast } from 'react-hot-toast'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import { Article } from '@/db/entity/Article'
import { axiosInstance } from '@/shared/utils/axiosInstance'

import { EditedItems } from './useEdit'

type PublishParams = EditedItems

type UpdateParams = EditedItems & {
  id: string
}

export const usePublishArticle = () => {
  const { push } = useRouter()
  return useMutation(
    (params: PublishParams) =>
      axios.post('/api/article/publish', { ...params }),
    {
      onSuccess: (res: any) => {
        const { _id } = res?.result
        toast.success('發布成功')
        push('/article/' + _id)
      }
    }
  )
}

export const useUpdateArticle = () => {
  const { push } = useRouter()
  return useMutation(
    (params: UpdateParams) =>
      axiosInstance.post('/api/article/update', { ...params }),
    {
      onSuccess: (res: any) => {
        const { _id } = res?.result
        toast.success('修改成功')
        push('/article/' + _id)
      }
    }
  )
}
