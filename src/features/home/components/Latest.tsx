import styled from '@emotion/styled'
import { Box, Grid, Stack } from '@mui/material'

import { ArticleLatestResponse } from '@/shared/types/api/article'

import { ArticleCard } from './ArticleCard'

interface LatestProps {
  articles: ArticleLatestResponse[] | undefined
}

export const Latest = ({ articles }: LatestProps) => {
  return (
    <Grid container alignItems='center' justifyContent='center'>
      <CardWrapper direction={'row'} justifyContent={'space-between'}>
        {articles?.map(({ _id, ...article }) => {
          const id = String(_id)
          return <ArticleCard key={id} id={id} {...article} />
        })}
      </CardWrapper>
    </Grid>
  )
}

const CardWrapper = styled(Stack)`
  flex-wrap: wrap;
  max-width: 900px;
  width: 95%;
  padding: 5vh 0;
  @media screen and (max-width: 960px) {
    width: 80%;
  }
  @media screen and (max-width: 700px) {
    max-width: 400px;
  }
`
