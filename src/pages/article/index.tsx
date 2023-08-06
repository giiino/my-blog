import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import {
  ArticleMenu,
  ArticleWrapper,
  Content
} from '@/features/article/components'
import TocHolder from '@/features/article/components/TocHolder'
import { getReadmeArticle } from '@/pages/api/article/get/article'
import { removeAttrsFromObject, serializeData } from '@/shared/utils/format'

import { ArticleResponse, MenuCategoriesResponse } from '../api/article'
import { getMenuCategories } from '../api/article/get/menu-categories'

const ArticleIndexPage = ({
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

export default ArticleIndexPage

export const getServerSideProps: GetServerSideProps<{
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
        articleData: serializeData(
          removeAttrsFromObject({
            target: articleData,
            removeAttrs: ['isReadme']
          })
        ),
        menuCategories: serializeData(menuCategories)
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
