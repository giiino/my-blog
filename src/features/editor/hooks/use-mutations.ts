import { toast } from 'react-hot-toast'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { axiosInstance } from '@/shared/utils/axiosInstance'

import { PublishParams, UpdateParams } from '../types'

export const usePublishArticle = () => {
  const { push } = useRouter()
  return useMutation(
    (params: PublishParams) =>
      axiosInstance.post('/api/article/publish', { ...params }),
    {
      onSuccess: (res) => {
        const id = res.data.result as string
        toast.success('發布成功')
        push('/article/' + id)
      },
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}

export const useUpdateArticle = () => {
  const { push } = useRouter()
  return useMutation(
    ({ _id, ...params }: UpdateParams) =>
      axiosInstance.put('/api/article/update/' + _id, {
        ...params
      }),
    {
      onSuccess: (res) => {
        const { _id } = res.data.result as UpdateParams
        toast.success('修改成功')
        push('/article/' + _id)
      },
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}

export const useDeleteArticle = () => {
  const { push } = useRouter()
  return useMutation(
    (id: string) => axiosInstance.delete('/api/article/delete/' + id),
    {
      onSuccess: () => {
        toast.success('刪除成功')
        push('/article')
      },
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}
