import { useState, ChangeEvent } from 'react'

import { EditedItems } from '../types'
import { usePublishArticle } from './use-mutations'

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
  const { mutate: publish, ...restMutationState } = usePublishArticle()
  console.log(article)
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

  const handlePublish = () => {
    publish(article)
  }

  return {
    article,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    handlePublish,
    ...restMutationState
  }
}
