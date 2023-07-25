import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'
import dayjs from 'dayjs'

import { Article } from '@/db/entity/Article'
import { Markdown } from '@/shared/components/Markdown'

interface ArticleContentProps extends GridProps {
  article: Article
}

export const Content = ({ article, ...restProps }: ArticleContentProps) => {
  const { title, content, create_time, update_time } = article

  const updateTime = dayjs(update_time).format('YYYY-MM-DD hh:mm:ss')

  return (
    <ContentWrapper {...restProps}>
      <Title>{title}</Title>
      <Time>
        上次修改時間
        <span>{updateTime}</span>
      </Time>
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
  font-size: 35px;
`

const Time = styled.div`
  font-size: 15px;
  color: var(--primary-gray-200);
  margin: 30px 0;
  span {
    margin-left: 15px;
  }
`
