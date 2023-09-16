import { ChangeEvent, useState } from 'react'

import { Article } from '@/db/entity/Article'
import { isKey } from '@/shared/utils/check'

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

  const onCoverImageChange = (image: string) => {
    setArticle((prev) => ({
      ...prev,
      coverImage: image
    }))
  }

  const onIsReadmeCheckChange = () => {
    setArticle((prev) => ({
      ...prev,
      isReadme: !prev.isReadme
    }))
  }

  /**
   * 重置表單資料
   * @param exclude 帶入則省略重置屬性
   */
  const reset = ({ exclude }: { exclude?: (keyof EditedItems)[] } = {}) => {
    const allResetResult: EditedItems = {
      ...defaultEditedItems,
      ...initialEditedItems
    }
    if (exclude) {
      setArticle((prev) => {
        return Object.keys(prev).reduce((acc, key) => {
          if (!isKey(prev, key)) {
            return acc
          }

          if (exclude.includes(key)) {
            return {
              ...acc,
              [key]: prev[key]
            }
          }
          return {
            ...acc,
            [key]: allResetResult[key]
          }
        }, {} as EditedItems)
      })
      return
    }

    setArticle(allResetResult)
  }

  return {
    article,
    reset,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onCoverImageChange,
    onIsReadmeCheckChange
  }
}
