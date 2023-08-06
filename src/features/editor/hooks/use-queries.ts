import toast from 'react-hot-toast'

import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/shared/utils/axiosInstance'

export const useCategories = () => {
  return useQuery<string[]>(
    ['categories'],
    async () => {
      const response = await axiosInstance.get('/api/article/get/categories')
      return response.data
    },
    {
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}
