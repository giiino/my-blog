import styled from '@emotion/styled'
import { StackProps } from '@mui/material'
import Link from 'next/link'

import { ErrorHandledImage } from '@/shared/components/ErrorHandledImage'
import { formatDate, markdownToTxt } from '@/shared/utils/format'

interface ArticleCardProps extends StackProps {
  id: string
  title: string
  content: string
  coverImage: string
  createTime: number
}

export const ArticleCard = ({
  id,
  title,
  content,
  createTime,
  coverImage,
  ...restProps
}: ArticleCardProps) => (
  <LinkWrapper href={'/article/' + id}>
    <CoverImage
      src={coverImage}
      alt='封面圖片'
      width={'400'}
      height={'400'}
      ratio={0.6}
    />
    <h3 className='title'>{title}</h3>
    <div className='content'>{markdownToTxt(content, 70)}...</div>
    <div className='time'>{formatDate(createTime)}</div>
  </LinkWrapper>
)

const LinkWrapper = styled(Link)`
  display: grid;
  width: 30%;
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
    color: var(--primary-dark-blue);
  }
  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 1.7;
    color: var(--primary-gray-200);
  }
  .time {
    font-size: 14px;
    color: var(--primary-gray-400);
    margin-top: auto;
  }
  &:hover {
    .content {
      color: var(--primary-blue-4);
    }
  }

  @media screen and (max-width: 960px) {
    width: 48%;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`

const CoverImage = styled(ErrorHandledImage)`
  width: 100%;
  object-fit: fill;
`
