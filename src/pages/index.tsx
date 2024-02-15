import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { Banner, Section } from '@/features/home/components'
import SEO from '@/shared/components/lib/SEO'
import { PostCardResponse } from '@/shared/types/api/post'
import { serialize } from '@/shared/utils/format'

import { getLatestPost } from './api/post/get/latest'

const Home = ({
  latestPosts
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <SEO />
      <Banner />
      <Section posts={latestPosts} title={'最新文章'} />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{
  latestPosts?: PostCardResponse[]
}> = async () => {
  try {
    const data = await getLatestPost()
    return {
      props: {
        latestPosts: serialize(data)
      }
    }
  } catch (error) {
    console.error('產生靜態頁面發生錯誤，最新文章獲取失敗', error)
    return {
      props: {}
    }
  }
}
