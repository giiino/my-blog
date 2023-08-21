import { useQuery } from '@tanstack/react-query'
import { hasCookie } from 'cookies-next'

import { MenuCategoriesResponse } from '@/shared/types/api/article'
import { UserInfo } from '@/shared/types/api/login'

import { axiosInstance } from '../utils/axiosInstance'

export const useMenuCategory = () => {
  return useQuery<MenuCategoriesResponse[]>(['menu-category'], async () => {
    const response = await axiosInstance.get('/api/article/get/menu-categories')
    return response.data
  })
}

export const useUser = () => {
  const enabledFetchUserInfo = hasCookie('enabledFetchUserInfo')
  return useQuery<UserInfo>(
    ['me'],
    async () => {
      const response = await axiosInstance.get('/api/login/me')
      return response.data
    },
    {
      enabled: enabledFetchUserInfo,
      staleTime: Infinity
    }
  )
}
