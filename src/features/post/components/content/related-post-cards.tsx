import styled from '@emotion/styled'

import { PostCard } from '@/features/post/components/post-card'
import { Title } from '@/features/post/components/title'
import { isVoid } from '@/shared/utils/check'

import { useRelatedPosts } from '../../hooks/use-queries'

export const RelatedPostCards = () => {
  const { data: relatedPost } = useRelatedPosts()
  if (isVoid(relatedPost)) {
    return null
  }

  return (
    <Container>
      <Title style={{ marginBottom: '35px' }}>相關文章</Title>
      <CardWrapper>
        {relatedPost!.map(({ id, ...restItem }) => {
          return <PostCard key={id} id={id} {...restItem} />
        })}
      </CardWrapper>
    </Container>
  )
}

const Container = styled.div`
  padding: 35px 0;
  border-top: 1px solid #e4e4e4;
`

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: 20px;
`
