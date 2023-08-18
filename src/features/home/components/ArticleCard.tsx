import styled from '@emotion/styled'
import { Stack, Grid, StackProps } from '@mui/material'
import dayjs from 'dayjs'
import { markdownToTxt } from 'markdown-to-txt'
import Link, { LinkProps } from 'next/link'

import { ErrorHandledImage } from '@/shared/components/ErrorHandledImage'

// import { formatDate } from '@/shared/utils/format'

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
}: ArticleCardProps) => {
  return (
    <LinkWrapper href={'/article/' + id}>
      <CoverImage
        src={coverImage}
        alt='封面圖片'
        width={'400'}
        height={'400'}
        ratio={0.75}
      />
      <h3 className='title'>{title}</h3>
      <div className='content'>
        {markdownToTxt(content.substring(0, 100))}...
      </div>
      <div className='time'>{dayjs(createTime).format('YYYY-MM-DD')}</div>
    </LinkWrapper>
  )
}

const LinkWrapper = styled(Link)`
  display: grid;
  width: 30%;

  > * {
    margin-bottom: 10px;
  }
  .title {
    color: var(--primary-dark-blue);
  }
  .content {
    color: var(--primary-gray-200);
  }
  .time {
    color: var(--primary-gray-400);
    margin-top: auto;
    margin-bottom: 30px;
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
