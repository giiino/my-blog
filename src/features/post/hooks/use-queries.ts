import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { PostCardResponse } from '@/shared/types/api/post'
import { axiosInstance } from '@/shared/utils/axios-instance'

export const useRelatedPosts = () => {
  const { query } = useRouter()
  const id = query.id
  return useQuery<PostCardResponse[]>(['related-posts', id], async () => {
    if (!id) {
      return []
    }

    const response = await axiosInstance.get('/api/post/get/related?id=' + id)
    return response.data
  })
}
