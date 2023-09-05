import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Stack } from '@mui/material'

import { ArticleCard } from '@/shared/components/ArticleCard'
import { Title } from '@/shared/components/Title'
import { ArticleCardResponse } from '@/shared/types/api/article'

interface RelatedArticleCardsProps {
  articleCardsData: ArticleCardResponse[] | undefined
}

export const RelatedArticleCards = ({
  articleCardsData
}: RelatedArticleCardsProps) => {
  const cardStyle = css`
    width: 48%;

    @media screen and (max-width: 700px) {
      width: 100%;
    }
  `

  return (
    <Container>
      <Title style={{ marginBottom: '35px' }}>相關文章</Title>
      <CardWrapper direction={'row'} justifyContent={'space-between'}>
        {articleCardsData?.map(({ _id, ...article }) => {
          const id = String(_id)
          return (
            <ArticleCard
              cssStyle={cardStyle}
              key={String(id)}
              id={id}
              {...article}
            />
          )
        })}
      </CardWrapper>
    </Container>
  )
}

const Container = styled.div`
  padding: 35px 0;
  border-top: 1px solid #e4e4e4;
`

const CardWrapper = styled(Stack)`
  flex-wrap: wrap;
`
