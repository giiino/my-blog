import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import {
  ArticleWrapper,
  Content,
  ArticleMenu
} from '@/features/article/components'
import TocHolder from '@/features/article/components/TocHolder'
import { getArticleById } from '@/pages/api/article/get/article'
import { serializeData } from '@/shared/utils/format'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'

import { ArticleResponse, MenuCategoriesResponse } from '../api/article'
import { getMenuCategories } from '../api/article/get/menu-categories'

const ArticlePage = ({
  articleData,
  menuCategories
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ArticleWrapper justifyContent={'center'} container>
      <ArticleMenu item lg={3} md={4} menuCategories={menuCategories} />
      <Content item lg={7} md={8} xs={12} article={articleData} />
      <TocHolder item lg={2} />
    </ArticleWrapper>
  )
}

export default ArticlePage

export const getServerSideProps: GetServerSideProps<{
  articleData: ArticleResponse
  menuCategories: MenuCategoriesResponse[]
}> = async (context) => {
  const id = context?.params?.id as string
  if (!isValidObjectId(id)) {
    return {
      notFound: true
    }
  }

  try {
    const [articleData, menuCategories] = await Promise.all([
      getArticleById(id, true),
      getMenuCategories()
    ])

    if (!articleData) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        articleData: serializeData(articleData),
        menuCategories: serializeData(menuCategories)
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
