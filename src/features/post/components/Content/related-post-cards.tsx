import styled from '@emotion/styled'

import { Title } from '@/features/post/components/Title'
import { PostCard } from '@/features/post/components/post-card'
import { PostCardResponse } from '@/shared/types/api/post'
import { isVoid } from '@/shared/utils/check'

interface RelatedPostCardsProps {
  postCardsData: PostCardResponse[] | undefined
}

export const RelatedPostCards = ({ postCardsData }: RelatedPostCardsProps) => {
  if (isVoid(postCardsData)) {
    return null
  }

  return (
    <Container>
      <Title style={{ marginBottom: '35px' }}>相關文章</Title>
      <CardWrapper>
        {postCardsData!.map(({ _id, ...restItem }) => {
          const id = String(_id)
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
