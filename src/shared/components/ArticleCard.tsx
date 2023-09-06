import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'

import { HandledImage } from '@/shared/components/HandledImage'
import { formatDate, markdownToTxt } from '@/shared/utils/format'

interface ArticleCardProps {
  id: string
  title: string
  content: string
  coverImage: string
  createTime: number
  cssStyle: SerializedStyles
}

export const ArticleCard = ({
  id,
  title,
  content,
  createTime,
  coverImage,
  cssStyle
}: ArticleCardProps) => (
  <LinkWrapper href={'/article/' + id} css={cssStyle}>
    <CoverImage
      src={coverImage}
      alt='封面圖片'
      width={'400'}
      height={'400'}
      realWidth='100%'
      ratio={0.6}
    />
    <h3 className='title'>{title}</h3>
    <div className='content'>{markdownToTxt(content, 300)}...</div>
    <div className='time'>{formatDate(createTime)}</div>
  </LinkWrapper>
)

const LinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  > * {
    margin-bottom: 10px;
  }
  .title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.card.titleColor};
  }
  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.card.summaryColor};
  }
  .time {
    font-size: 14px;
    color: ${({ theme }) => theme.card.timeColor};
    margin-top: auto;
  }
  &:hover {
    .content {
      color: ${({ theme }) => theme.card.summaryHoverColor};
    }
  }
`

const CoverImage = styled(HandledImage)``
