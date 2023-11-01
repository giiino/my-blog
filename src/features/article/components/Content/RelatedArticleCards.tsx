import styled from '@emotion/styled'

import { ArticleCard } from '@/shared/components/article/ArticleCard'
import { Title } from '@/shared/components/article/Title'
import { ArticleCardResponse } from '@/shared/types/api/article'
import { isVoid } from '@/shared/utils/check'

interface RelatedArticleCardsProps {
  articleCardsData: ArticleCardResponse[] | undefined
}

export const RelatedArticleCards = ({
  articleCardsData
}: RelatedArticleCardsProps) => {
  if (isVoid(articleCardsData)) {
    return null
  }

  return (
    <Container>
      <Title style={{ marginBottom: '35px' }}>相關文章</Title>
      <CardWrapper>
        {articleCardsData!.map(({ _id, ...article }) => {
          const id = String(_id)
          return <ArticleCard key={id} id={id} {...article} />
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
