import React from 'react'

import { Grid } from '@mui/material'

import { Article } from '@/db/entity/Article'
import { ArticleContent } from '@/features/article/components/ArticleContent '
import Menu from '@/features/article/components/Menu'
import { getArticleById } from '@/pages/api/article/get'
import { serializeData } from '@/shared/utils/format'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'

const ArticlePage = ({ articleData }: { articleData: Article }) => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={3}>
        <Menu />
      </Grid>
      <Grid item xs={6}>
        <ArticleContent article={articleData} />
      </Grid>
      <Grid item xs={3}>
        123
      </Grid>
    </Grid>
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

  const articleData = await getArticleById(id, true)

  if (!articleData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      articleData: serializeData(articleData)
    }
  }
}
