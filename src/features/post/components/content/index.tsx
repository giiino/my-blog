import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'
import Image from 'next/image'

import { AdminOnly } from '@/shared/components/lib/admin-only'
import { Markdown } from '@/shared/components/markdown'
import { PostCardResponse, PostResponse } from '@/shared/types/api/post'
import { isVoid } from '@/shared/utils/check'
import { formatDate } from '@/shared/utils/format'

import { RelatedPostCards } from './related-post-cards'
import { Setting } from './setting'

interface PostContentProps extends GridProps {
  post: Omit<PostResponse, 'isReadme'>
  relatedPost?: PostCardResponse[]
}

export const Content = ({
  post,
  relatedPost,
  ...restProps
}: PostContentProps) => {
  const { _id, title, content, updateTime, createTime, coverImage } = post
  const formattedCreateTime = formatDate(createTime)
  const formattedUpdateTime = formatDate(updateTime)

  return (
    <ContentWrapper {...restProps}>
      <Title>
        {title}
        <AdminOnly>
          <Setting className='setting-btn' editId={_id} />
        </AdminOnly>
      </Title>
      <Time>
        建立於
        <span>{formattedCreateTime}</span>&ensp;/&ensp;修改於
        <span>{formattedUpdateTime}</span>
      </Time>
      {!isVoid(coverImage) && (
        <CoverImage src={coverImage} alt='封面圖' width='1000' height='750' />
      )}
      <Markdown style={{ marginBottom: '50px' }}>{content}</Markdown>
      <RelatedPostCards postCardsData={relatedPost} />
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
  margin: 20px 0;
  span {
    margin-left: 5px;
  }
`

const CoverImage = styled(Image)`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`
