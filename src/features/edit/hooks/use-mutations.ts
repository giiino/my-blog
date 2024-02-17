import { toast } from 'react-hot-toast'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { uploadCompressImage, uploadImage } from '@/shared/services/upload'
import { axiosInstance } from '@/shared/utils/axios-instance'

import { PublishParams, UpdateParams } from '../types'

export const usePublishPost = () => {
  const { push } = useRouter()
  return useMutation(
    (params: PublishParams) =>
      axiosInstance.post('/api/post/publish', { ...params }),
    {
      onSuccess: (res) => {
        const id = res.data.result as string
        toast.success('發布成功')
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
  return useMutation(
    ({ _id, ...params }: UpdateParams) =>
      axiosInstance.put('/api/post/update/' + _id, {
        ...params
      }),
    {
      onSuccess: (res) => {
        const { _id } = res.data.result as UpdateParams
        toast.success('修改成功')
        push('/post/' + _id)
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
      const [originalImage, compressedImage] = await Promise.all([
        uploadImage(file),
        uploadCompressImage(file)
      ])
      const result =
        originalImage.url +
        `?width=${originalImage.width}&height=${originalImage.height},` +
        compressedImage.url
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
