import styled from '@emotion/styled'
import Link from 'next/link'

import { EnhancedImage } from '@/shared/components/lib/enhanced-image'
import { formatDate, markdownToTxt } from '@/shared/utils/format'

interface PostCardProps {
  id: string
  title: string
  content: string
  coverImage: string
  createTime: number
}

export const PostCard = ({
  id,
  title,
  createTime,
  coverImage
}: PostCardProps) => (
  <LinkWrapper href={'/post/' + id}>
    <CoverImage
      src={coverImage}
      alt='封面圖片'
      width={800}
      height={400}
      ratio={0.6}
      imageWidth={'100%'}
    />
    <h3 className='title'>{title}</h3>
    <div className='time'>{formatDate(createTime)}</div>
  </LinkWrapper>
)

const LinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 15px;
  }
  .title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    color: var(--color-card-title-text);
  }
  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
    line-height: 1.7;
    word-break: break-all;
    color: var(--color-card-summary-text);
  }
  .time {
    font-size: 14px;
    color: var(--color-card-time-text);
    margin-top: auto;
  }
  &:hover {
    .content {
      color: var(--color-card-summary-hover-text);
    }
  }
`

const CoverImage = styled(EnhancedImage)`
  border-radius: 10px;
`
