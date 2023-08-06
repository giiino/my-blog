import { ChangeEvent, useState } from 'react'

import { Article } from '@/db/entity/Article'

export type EditedItems = Omit<
  Article,
  '_id' | 'createTime' | 'updateTime' | 'views' | 'isDelete' | 'isReadme'
> & {
  isReadme: boolean
}

const defaultEditedItems = {
  category: '',
  title: '',
  content: '',
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
