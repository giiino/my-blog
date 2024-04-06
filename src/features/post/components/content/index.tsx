import { memo } from 'react'

import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'

import { AdminOnly } from '@/shared/components/lib/admin-only'
import { EnhancedImage } from '@/shared/components/lib/enhanced-image'
import { Markdown } from '@/shared/components/markdown'
import { POST_MARKDOWN_ID } from '@/shared/constants/ui'
import { PostResponse } from '@/shared/types/api/post'
import { isVoid } from '@/shared/utils/check'
import { formatDate } from '@/shared/utils/format'

import { useHeadingsData } from '../../hooks/use-headings'
import { RelatedPostCards } from './related-post-cards'
import { Setting } from './setting'

interface PostContentProps extends GridProps {
  post: Omit<PostResponse, 'isReadme'>
}

export const Content = memo(({ post, ...restProps }: PostContentProps) => {
  const { id, title, content, createTime, coverImage } = post
  const formattedCreateTime = formatDate(createTime)
  useHeadingsData()

  return (
    <ContentWrapper {...restProps}>
      <Title>
        {title}
        <AdminOnly>
          <Setting className='setting-btn' editId={id} />
        </AdminOnly>
      </Title>
      <Time>
        建立於
        <span>{formattedCreateTime}</span>&ensp;
      </Time>
      {!isVoid(coverImage) && (
        <EnhancedImage
          src={coverImage}
          alt='封面圖'
          imageWidth='100%'
          ratio={0.6}
          containerStyle={{ marginBottom: '20px' }}
        />
      )}
      <Markdown id={POST_MARKDOWN_ID} style={{ marginBottom: '50px' }}>
        {content}
      </Markdown>
      <RelatedPostCards />
    </ContentWrapper>
  )
})

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

const Title = styled.h2`
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
