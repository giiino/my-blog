import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'

import { Article } from '@/db/entity/Article'
import { Markdown } from '@/shared/components/Markdown'

interface ArticleContentProps extends GridProps {
  article: Article
}

export const Content = ({ article, ...restProps }: ArticleContentProps) => {
  const { title, content, create_time, update_time } = article
  return (
    <ContentWrapper {...restProps}>
      <Title>{title}</Title>
      <Markdown>{content}</Markdown>
    </ContentWrapper>
  )
}

const ContentWrapper = styled(Grid)`
  margin-top: 50px;
  padding: 0 14px;
  @media screen and (max-width: 1100px) {
    padding-right: 0;
  }
  @media screen and (max-width: 960px) {
    padding-left: 0;
  }
`

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 35px;
`
