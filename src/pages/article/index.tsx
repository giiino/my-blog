import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

import {
  ArticleMenu,
  ArticleWrapper,
  Content
} from '@/features/article/components'
import TocHolder from '@/features/article/components/TocHolder'
import { getReadmeArticle } from '@/pages/api/article/get'
import SEO from '@/shared/components/lib/SEO'
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
  return (
    <>
      <SEO
        title={title}
        description={markdownToTxt(content, 150)}
        thumbnail={coverImage}
      />
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
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
