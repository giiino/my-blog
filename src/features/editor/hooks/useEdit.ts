import { ChangeEvent, useState } from 'react'

import { Article } from '@/db/entity/Article'

export type EditedItems = Omit<
  Article,
  '_id' | 'create_time' | 'update_time' | 'views' | 'is_delete'
>

const defaultEditedItems = {
  category: '',
  title: '',
  content: ''
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

  return {
    article,
    onCategoryChange,
    onTitleChange,
    onContentChange
  }
}
