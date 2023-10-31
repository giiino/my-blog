import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Grid, Stack } from '@mui/material'

import { ArticleCard } from '@/shared/components/ArticleCard'
import { Title } from '@/shared/components/Title'
import { ArticleCardResponse } from '@/shared/types/api/article'
import { isVoid } from '@/shared/utils/check'

interface SectionProps {
  articles: ArticleCardResponse[] | undefined
  title: string
}

export const Section = ({ articles, title }: SectionProps) => {
  if (isVoid(articles)) {
    return null
  }

  return (
    <Container>
      <SectionTitle>{title}</SectionTitle>
      <CardWrapper>
        {articles!.map(({ _id, ...article }) => {
          const id = String(_id)
          return <ArticleCard key={id} id={id} {...article} />
        })}
      </CardWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 65vw;
  margin: auto;
  padding: 40px 0;
`

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: 30px;
`

export const SectionTitle = styled(Title)`
  margin-bottom: 30px;
`
