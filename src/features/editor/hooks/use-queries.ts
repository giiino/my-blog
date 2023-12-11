import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/shared/utils/axiosInstance'

import { formatArticleResponse } from '../utils/format'
import { EditedItems } from './useEdit'

export const useEditorData = (id: string) => {
  return useQuery<Partial<EditedItems>>(['editor-data'], async () => {
    const response = await axiosInstance.get('/api/article/get/' + id)
    return formatArticleResponse(response.data)
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
