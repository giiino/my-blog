import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { Banner, Latest, SectionTitle } from '@/features/home/components'
import { ArticleCardResponse } from '@/shared/types/api/article'
import { serializeData } from '@/shared/utils/format'

import { getLatestArticle } from './api/article/get/latest'

const Home = ({
  latestArticles
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Banner />
      <SectionTitle>最新文章</SectionTitle>
      <Latest articles={latestArticles} />
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
