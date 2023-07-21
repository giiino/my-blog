import React from 'react'

import { Article } from '@/db/entity/Article'
import { ArticleContent } from '@/features/article/components/ArticleContent '
import { getArticleById } from '@/pages/api/article/get'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'

const ArticlePage = ({ articleData }: { articleData: Article }) => {
  return <ArticleContent article={articleData} />
}

export default ArticlePage

export async function getServerSideProps(context: any) {
  const id = context.params.id
  if (!isValidObjectId(id)) {
    return {
      notFound: true
    }
  }

  const articleData = await getArticleById(id)

  if (!articleData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      articleData: JSON.parse(JSON.stringify(articleData)) as Article
    }
  }
}
