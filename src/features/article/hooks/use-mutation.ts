import { toast } from 'react-hot-toast'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { axiosInstance } from '@/shared/utils/axiosInstance'

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
