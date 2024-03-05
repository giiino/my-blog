import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/shared/utils/axios-instance'

import { EditedItems } from './use-edit'

export const useEditorData = (id: string | undefined) => {
  return useQuery<Partial<EditedItems>>(
    ['editor-data'],
    async () => {
      const response = await axiosInstance.get('/api/post/get/' + id)
      return response.data
    },
    {
      enabled: !!id
    }
  )
}

export const useConverImages = () => {
  return useQuery<string[]>(['coverImages'], async () => {
    const response = await axiosInstance.get('/api/post/get/cover-images')
    return response.data
  })
}
