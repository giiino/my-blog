import styled from '@emotion/styled'
import EditIcon from '@mui/icons-material/Edit'
import { Grid, GridProps, IconButton, Stack } from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Article } from '@/db/entity/Article'
import { ArticleResponse } from '@/pages/api/article'
import { Markdown } from '@/shared/components/Markdown'

interface ArticleContentProps extends GridProps {
  article: ArticleResponse
}

export const Content = ({ article, ...restProps }: ArticleContentProps) => {
  const { push } = useRouter()
  const { _id, title, content, update_time } = article

  const updateTime = dayjs(update_time).format('YYYY-MM-DD hh:mm:ss')

  const changeToEdit = () => push(`/edit/${_id}`)

  return (
    <ContentWrapper {...restProps}>
      <Title>
        {title}
        <IconButton size='small' onClick={changeToEdit}>
          <EditIcon fontSize='inherit' />
        </IconButton>
      </Title>
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
  padding: 0 18px;
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
  margin-top: 5px;
  margin-bottom: 30px;
  span {
    margin-left: 15px;
  }
`
