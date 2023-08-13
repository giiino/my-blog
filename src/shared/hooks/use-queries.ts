import { toast } from 'react-hot-toast'

import { useQuery } from '@tanstack/react-query'

import { MenuCategoriesResponse } from '@/pages/api/article'
import { UserInfo } from '@/pages/api/login'

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
      onError: (error) => {
        toast.error(error as string)
      }
    }
  )
}

export const useUser = () => {
  return useQuery<UserInfo>(
    ['me'],
    async () => {
      const response = await axiosInstance.get('/api/login/me')
      return response.data
    },
    {
      staleTime: Infinity
    }
  )
}
