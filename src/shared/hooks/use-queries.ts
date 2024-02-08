import { useQuery } from '@tanstack/react-query'
import { hasCookie } from 'cookies-next'

import * as constants from '@/shared/constants/auth'
import { UserInfo } from '@/shared/types/api/login'
import { MenuCategoriesResponse } from '@/shared/types/api/post'

import { axiosInstance } from '../utils/axios-instance'

export const useMenuCategory = () => {
  return useQuery<MenuCategoriesResponse[]>(['menu-category'], async () => {
    const response = await axiosInstance.get('/api/post/get/menu-categories')
    return response.data
  })
}

export const useUser = () => {
  const enabledFetchUserInfo = hasCookie(constants.ACCESS_TOKEN_COOKIE)
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
