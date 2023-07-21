import { Article } from '@/db/entity/Article'
import { Markdown } from '@/shared/components/Markdown'

interface ArticleContentProps {
  article: Article
}

export const ArticleContent = ({ article }: ArticleContentProps) => {
  const { content } = article
  return <Markdown>{content}</Markdown>
}
