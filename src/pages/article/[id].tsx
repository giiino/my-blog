import { Article } from '@/db/entity/Article'
import { ArticleWrapper, Content, Menu } from '@/features/article/components'
import TocHolder from '@/features/article/components/TocHolder'
import { getArticleById } from '@/pages/api/article/get'
import { serializeData } from '@/shared/utils/format'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'

import { MenuCategoriesResponse } from '../api/article'
import { getMenuCategories } from '../api/article/get-menu-categories'

const ArticlePage = ({
  articleData,
  menuCategories
}: {
  articleData: Article
  menuCategories: MenuCategoriesResponse[]
}) => {
  return (
    <ArticleWrapper justifyContent={'center'} container>
      <Menu item lg={3} md={4} menuCategories={menuCategories} />
      <Content item lg={7} md={8} xs={12} article={articleData} />
      <TocHolder item lg={2} />
    </ArticleWrapper>
  )
}

export default ArticlePage

export async function getServerSideProps(context: any) {
  const id = context.params.id
  if (!isValidObjectId(id)) {
    return {
      notFound: true
    }
  }

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
}
