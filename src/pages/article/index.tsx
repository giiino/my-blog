import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { ArticleWrapper, Content, Menu } from '@/features/article/components'
import TocHolder from '@/features/article/components/TocHolder'
import {
  getArticleById,
  getReadmeArticle
} from '@/pages/api/article/get-article'
import { serializeData } from '@/shared/utils/format'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'

import { ArticleResponse, MenuCategoriesResponse } from '../api/article'
import { getMenuCategories } from '../api/article/get-menu-categories'

const ArticleIndexPage = ({
  articleData,
  menuCategories
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <ArticleWrapper justifyContent={'center'} container>
      <Menu item lg={3} md={4} menuCategories={menuCategories} />
      <Content item lg={7} md={8} xs={12} article={articleData} />
      <TocHolder item lg={2} />
    </ArticleWrapper>
  )
}

export default ArticleIndexPage

export const getServerSideProps: GetServerSideProps<{
  articleData: ArticleResponse
  menuCategories: MenuCategoriesResponse[]
}> = async () => {
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
      articleData: serializeData(articleData),
      menuCategories: serializeData(menuCategories)
    }
  }
}
