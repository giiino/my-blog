import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import {
  ArticleMenu,
  ArticleWrapper,
  Content
} from '@/features/article/components'
import TocHolder from '@/features/article/components/TocHolder'
import { getArticleById } from '@/pages/api/article/get'
import SEO from '@/shared/components/SEO'
import {
  ArticleCardResponse,
  ArticleResponse,
  MenuCategoriesResponse
} from '@/shared/types/api/article'
import { isValidObjectId } from '@/shared/utils/check'
import { exclude, markdownToTxt, serializeData } from '@/shared/utils/format'

import { getMenuCategories } from '../api/article/get/menu-categories'
import { getRelatedArticles } from '../api/article/get/related'

const ArticlePage = ({
  articleData,
  menuCategories,
  relatedArticle
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <Content
          item
          lg={7}
          md={8}
          xs={12}
          article={articleData}
          relatedArticle={relatedArticle}
        />
        <TocHolder item lg={2} />
      </ArticleWrapper>
    </>
  )
}

export default ArticlePage

export const getServerSideProps: GetServerSideProps<{
  articleData: Omit<ArticleResponse, 'isReadme'>
  menuCategories: MenuCategoriesResponse[]
  relatedArticle: ArticleCardResponse[]
}> = async (context) => {
  const id = context?.params?.id as string
  if (!isValidObjectId(id)) {
    return {
      notFound: true
    }
  }

  try {
    const [articleData, menuCategories, relatedArticle] = await Promise.all([
      getArticleById(id, true),
      getMenuCategories(),
      getRelatedArticles(id)
    ])

    if (!articleData) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        articleData: serializeData(exclude(articleData, ['isReadme'])),
        menuCategories: serializeData(menuCategories),
        relatedArticle: serializeData(relatedArticle)
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
