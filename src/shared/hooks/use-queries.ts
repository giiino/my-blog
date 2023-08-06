import { toast } from 'react-hot-toast'

import { useQuery } from '@tanstack/react-query'

import { MenuCategoriesResponse } from '@/pages/api/article'

import { axiosInstance } from '../utils/axiosInstance'

export const useMenuCategory = () => {
  return useQuery<MenuCategoriesResponse[]>(
    ['menu-category'],
    async () => {
      const response = await axiosInstance.get(
        '/api/article/get/menu-categories'
      )
      return response.data
    },
    {
      onError: () => {
        toast.error('選單資料獲取失敗')
      }
    }
  )
}
