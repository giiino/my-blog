import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'
import dayjs from 'dayjs'

import { ArticleResponse } from '@/pages/api/article'
import { Markdown } from '@/shared/components/Markdown'

import { Setting } from './Setting'

interface ArticleContentProps extends GridProps {
  article: Omit<ArticleResponse, 'isReadme'>
}

export const Content = ({ article, ...restProps }: ArticleContentProps) => {
  const { _id, title, content, updateTime } = article

  const formattedUpdateTime = dayjs(updateTime).format('YYYY-MM-DD')

  return (
    <ContentWrapper {...restProps}>
      <Title>
        {title}
        <Setting className='setting-btn' editId={_id} />
      </Title>
      <Time>
        修改時間
        <span>{formattedUpdateTime}</span>
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
  position: relative;
  font-size: 35px;
  padding-right: 50px;
  .setting-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
`

const Time = styled.div`
  font-size: 13.5px;
  color: var(--primary-gray-200);
  margin-top: 5px;
  margin-bottom: 30px;
  span {
    margin-left: 5px;
  }
`
