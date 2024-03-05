import { toast } from 'react-hot-toast'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { axiosInstance } from '@/shared/utils/axios-instance'

export const useDeletePost = () => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  return useMutation(
    (id: string) => axiosInstance.delete('/api/post/delete/' + id),
    {
      onSuccess: () => {
        toast.success('刪除成功')
        queryClient.invalidateQueries(['menu-category'])
        push('/post')
      },
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}
