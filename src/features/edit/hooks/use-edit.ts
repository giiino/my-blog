import { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { Post } from '@/db/entity/Post'
import { useMenuCategory } from '@/shared/hooks/use-queries'
import { exclude as excludeUtil } from '@/shared/utils/format'

export type EditedItems = Pick<
  Post,
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
  const [post, setPost] = useState<EditedItems>({
    ...defaultEditedItems,
    ...initialEditedItems
  })
  const onCategoryChange = (_: unknown, value: string | null) => {
    setPost((prev) => ({
      ...prev,
      category: value || ''
    }))
  }

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({
      ...prev,
      title: e.target.value
    }))
  }

  const onContentChange = ({ text }: { text: string }) => {
    setPost((prev) => ({
      ...prev,
      content: text
    }))
  }

  const onCoverImageChange = (image: string) => {
    setPost((prev) => ({
      ...prev,
      coverImage: image
    }))
  }

  const onIsReadmeCheckChange = () => {
    setPost((prev) => ({
      ...prev,
      isReadme: !prev.isReadme
    }))
  }

  /**
   * 重置表單資料
   * @param exclude 帶入則省略重置屬性
   */
  const reset = ({ exclude }: { exclude?: (keyof EditedItems)[] } = {}) => {
    const resetResult = {
      ...defaultEditedItems,
      ...initialEditedItems
    }

    if (exclude) {
      setPost((prev) => ({
        ...prev,
        ...excludeUtil(resetResult, exclude)
      }))
      return
    }

    setPost(resetResult)
  }

  useEffect(() => {
    if (initialEditedItems) {
      setPost({
        ...defaultEditedItems,
        ...initialEditedItems
      })
    }
  }, [initialEditedItems])

  return {
    post,
    reset,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onCoverImageChange,
    onIsReadmeCheckChange
  }
}

export const useCategories = () => {
  const { data } = useMenuCategory()
  return useMemo(() => {
    return data?.map(({ category }) => category)
  }, [data])
}
