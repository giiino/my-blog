import Head from 'next/head'
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType
} from 'next/types'

import {
  ArticleMenu,
  ArticleWrapper,
  Content
} from '@/features/article/components'
import TocHolder from '@/features/article/components/TocHolder'
import { getReadmeArticle } from '@/pages/api/article/get'
import {
  ArticleResponse,
  MenuCategoriesResponse
} from '@/shared/types/api/article'
import { exclude, markdownToTxt, serialize } from '@/shared/utils/format'

import { getMenuCategories } from '../api/article/get/menu-categories'

const ArticleIndexPage = ({
  articleData,
  menuCategories
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, content, coverImage } = articleData

  const description = markdownToTxt(content, 150)

  return (
    <>
      <Head>
        <title key='title'>{title}</title>
        <meta property='og:image' content={coverImage} key='thumbnail' />
        <meta name='description' content={description} key='description' />
        <meta property='og:title' content={title} key='og:title' />
        <meta
          property='og:description'
          content={description}
          key='og:description'
        />
        <meta property='og:site_name' content={title} key='og:site_name' />
      </Head>
      <ArticleWrapper justifyContent={'center'} container>
        <ArticleMenu item lg={3} md={4} menuCategories={menuCategories} />
        <Content item lg={7} md={8} xs={12} article={articleData} />
        <TocHolder item lg={2} />
      </ArticleWrapper>
    </>
  )
}

export default ArticleIndexPage

export const getStaticProps: GetStaticProps<{
  articleData: Omit<ArticleResponse, 'isReadme'>
  menuCategories: MenuCategoriesResponse[]
}> = async () => {
  try {
    const [articleData, menuCategories] = await Promise.all([
      getReadmeArticle(),
      getMenuCategories()
    ])

    if (!articleData) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        articleData: serialize(exclude(articleData, ['isReadme'])),
        menuCategories: serialize(menuCategories)
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
