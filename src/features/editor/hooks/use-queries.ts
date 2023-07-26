import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/shared/utils/axiosInstance'

export const useCategories = () => {
  return useQuery<string[]>(['categories'], async () => {
    const response: string[] = await axiosInstance.get(
      '/api/article/get-categories'
    )
    return response
  })
}
