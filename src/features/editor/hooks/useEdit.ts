import { ChangeEvent, useState } from 'react'

import { useRouter } from 'next/router'

import { Article } from '@/db/entity/Article'

import { usePublishArticle, useUpdateArticle } from './use-mutations'

export type EditedItems = Omit<
  Article,
  '_id' | 'create_time' | 'update_time' | 'is_delete'
>

const defaultEditedItems = {
  category: '88',
  title: '',
  content: ''
}

export const useEdit = (intialEditedItems?: Partial<EditedItems>) => {
  const [article, setArticle] = useState<EditedItems>({
    ...defaultEditedItems,
    ...intialEditedItems
  })
  const { query } = useRouter()

  const { mutate: publish } = usePublishArticle()
  const { mutate: update } = useUpdateArticle()

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

  const handleSubmit = () => (query.id ? update(article) : publish(article))

  return {
    article,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    handleSubmit
  }
}
