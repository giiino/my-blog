import { ChangeEvent, useState } from 'react'

import { Article } from '@/db/entity/Article'

export type EditedItems = Pick<
  Article,
  'category' | 'content' | 'title' | 'coverImage'
> & {
  isReadme: boolean
}

const defaultEditedItems: EditedItems = {
  category: '',
  title: '',
  content: '',
  coverImage: '',
  isReadme: false
}

export const useEdit = (initialEditedItems?: Partial<EditedItems>) => {
  const [article, setArticle] = useState<EditedItems>({
    ...defaultEditedItems,
    ...initialEditedItems
  })
  const onCategoryChange = (_: unknown, value: string | null) => {
    setArticle((prev) => ({
      ...prev,
      category: value || ''
    }))
  }

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArticle((prev) => ({
      ...prev,
      title: e.target.value
    }))
  }

  const onContentChange = ({ text }: { text: string }) => {
    setArticle((prev) => ({
      ...prev,
      content: text
    }))
  }

  const onIsReadmeCheckChange = () => {
    setArticle((prev) => ({
      ...prev,
      isReadme: !prev.isReadme
    }))
  }

  return {
    article,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onIsReadmeCheckChange
  }
}
