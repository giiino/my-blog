import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Grid, Stack } from '@mui/material'

import { ArticleCard } from '@/shared/components/ArticleCard'
import { ArticleCardResponse } from '@/shared/types/api/article'

interface LatestProps {
  articles: ArticleCardResponse[] | undefined
}

export const Latest = ({ articles }: LatestProps) => {
  const cardStyle = css`
    width: 30%;
    @media screen and (max-width: 960px) {
      width: 48%;
    }
    @media screen and (max-width: 700px) {
      width: 100%;
    }
  `

  return (
    <Grid container alignItems='center' justifyContent='center'>
      <CardWrapper direction={'row'} justifyContent={'space-between'}>
        {articles?.map(({ _id, ...article }) => {
          const id = String(_id)
          return (
            <ArticleCard key={id} id={id} cssStyle={cardStyle} {...article} />
          )
        })}
      </CardWrapper>
    </Grid>
  )
}

const CardWrapper = styled(Stack)`
  flex-wrap: wrap;
  max-width: 900px;
  width: 95%;
  padding: 35px 0;
  @media screen and (max-width: 960px) {
    width: 85%;
  }
  @media screen and (max-width: 700px) {
    max-width: 400px;
  }
`
