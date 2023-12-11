import { useQuery } from '@tanstack/react-query'

import { ArticleEditResponse } from '@/shared/types/api/article'
import { axiosInstance } from '@/shared/utils/axiosInstance'

export const useEditorData = (id: string) => {
  return useQuery<ArticleEditResponse>(['editor-data'], async () => {
    const response = await axiosInstance.get('/api/article/get/' + id)
    return response.data
  })
}

export const useCategories = () => {
  return useQuery<string[]>(['categories'], async () => {
    const response = await axiosInstance.get('/api/article/get/categories')
    return response.data
  })
}

export const useConverImages = () => {
  return useQuery<string[]>(['coverImages'], async () => {
    const response = await axiosInstance.get('/api/article/get/cover-images')
    return response.data
  })
}
