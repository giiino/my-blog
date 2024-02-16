import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Grid, Stack } from '@mui/material'

import { PostCard } from '@/features/post/components/post-card'
import { Title } from '@/features/post/components/title'
import { PostCardResponse } from '@/shared/types/api/post'
import { isVoid } from '@/shared/utils/check'

interface SectionProps {
  posts: PostCardResponse[] | undefined
  title: string
}

export const Section = ({ posts, title }: SectionProps) => {
  if (isVoid(posts)) {
    return null
  }

  return (
    <Container>
      <SectionTitle>{title}</SectionTitle>
      <CardWrapper>
        {posts!.map(({ _id, ...restItem }) => {
          const id = String(_id)
          return <PostCard key={id} id={id} {...restItem} />
        })}
      </CardWrapper>
    </Container>
  )
}

const Container = styled.div`
  max-width: 990px;
  width: 85vw;
  margin: auto;
  padding: 40px 0;
`

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: 30px;
`

export const SectionTitle = styled(Title)`
  margin-bottom: 30px;
`
