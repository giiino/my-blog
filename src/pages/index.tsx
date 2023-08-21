import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { Banner } from '@/features/home/components/Banner'
import { Latest } from '@/features/home/components/Latest'
import { Title } from '@/features/home/components/Title'
import SEO from '@/shared/components/SEO'
import { ArticleLatestResponse } from '@/shared/types/api/article'
import { serializeData } from '@/shared/utils/format'

import { getLatestArticle } from './api/article/get/latest'

const Home = ({
  latestArticles
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO />
      <Banner />
      <Title>最新文章</Title>
      <Latest articles={latestArticles} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{
  latestArticles?: ArticleLatestResponse[]
}> = async () => {
  try {
    const data = await getLatestArticle()
    return {
      props: {
        latestArticles: serializeData(data)
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
