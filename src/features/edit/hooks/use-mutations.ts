import { toast } from 'react-hot-toast'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { uploadImage } from '@/shared/services/upload'
import { axiosInstance } from '@/shared/utils/axios-instance'

import { FormValues, ValueKeys } from '../components/edit-formik'

export type PublishParams = FormValues
export type UpdateParams = FormValues

export const usePublishPost = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  return useMutation(
    (params: PublishParams) =>
      axiosInstance.post('/api/post/publish', { ...params }),
    {
      onSuccess: (_, { id }) => {
        toast.success('發布成功')
        queryClient.invalidateQueries(['menu-category'])
        push('/post/' + id)
      },
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}

export const useUpdatePost = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  return useMutation(
    ({ id, ...params }: UpdateParams) =>
      axiosInstance.put('/api/post/update/' + id, {
        ...params
      }),
    {
      onSuccess: (_, { id }) => {
        toast.success('修改成功')
        queryClient.invalidateQueries(['menu-category'])
        push('/post/' + id)
      },
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}

export const useUploadImage = () => {
  return useMutation(
    async (file: File) => {
      const originalImage = await uploadImage(file)
      const result =
        originalImage.url +
        `?width=${originalImage.width}&height=${originalImage.height}`
      return Promise.resolve(result)
    },
    {
      onSuccess: () => {
        toast.success('上傳成功')
      },
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}
