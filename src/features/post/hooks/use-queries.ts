import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { PostCardResponse } from '@/shared/types/api/post'
import { axiosInstance } from '@/shared/utils/axios-instance'

export const useRelatedPosts = () => {
  const { query } = useRouter()

  return useQuery<PostCardResponse[]>(['related-posts'], async () => {
    const response = await axiosInstance.get(
      '/api/post/get/related?id=' + query.id
    )
    return response.data
  })
}
