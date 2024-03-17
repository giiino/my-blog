import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { Banner, Section } from '@/features/home/components'
import { PostCardResponse } from '@/shared/types/api/post'
import { serialize } from '@/shared/utils/format'

import { getLatestPost } from './api/post/get/latest'

const Home = ({
  latestPosts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Banner />
      <Section posts={latestPosts} title={'最新文章'} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{
  latestPosts?: PostCardResponse[]
}> = async () => {
  try {
    const data = await getLatestPost()
    return {
      props: {
        latestPosts: serialize(data)
      },
      revalidate: 30
    }
  } catch (error) {
    console.error('產生靜態頁面發生錯誤，最新文章獲取失敗', error)
    return {
      props: {}
    }
  }
}
