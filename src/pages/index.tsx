import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { Banner, Section } from '@/features/home/components'
import { ArticleCardResponse } from '@/shared/types/api/article'
import { serialize } from '@/shared/utils/format'

import { getLatestArticle } from './api/article/get/latest'

const Home = ({
  latestArticles
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Banner />
      <Section articles={latestArticles} title={'最新文章'} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{
  latestArticles?: ArticleCardResponse[]
}> = async () => {
  try {
    const data = await getLatestArticle()
    return {
      props: {
        latestArticles: serialize(data)
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('產生靜態頁面發生錯誤，最新文章獲取失敗', error)
    return {
      props: {}
    }
  }
}
