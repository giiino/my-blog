import { useState } from 'react'

import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'

import { ArticleInfoModal } from '@/features/editor/components/ArticleInfoModal'
import { ContentEditor } from '@/features/editor/components/Editor'
import { useUpdateArticle } from '@/features/editor/hooks/use-mutations'
import { useEditorData } from '@/features/editor/hooks/use-queries'
import { useEdit } from '@/features/editor/hooks/useEdit'
import { formatArticleResponse } from '@/features/editor/utils/format'
import { PageLoading } from '@/shared/components/loading/PageLoading'
import { ArticleEditResponse } from '@/shared/types/api/article'
import { isValidObjectId } from '@/shared/utils/check'
import { exclude, serialize } from '@/shared/utils/format'
import { isAdmin } from '@/shared/utils/jwt'

import { getArticleById } from '../api/article/get'

const Editor = () => {
  const { query } = useRouter()
  const { data: editorData, isLoading } = useEditorData(query.id as string)
  const { mutate: update } = useUpdateArticle()
  const {
    article: { content, title, category, isReadme, coverImage },
    reset,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onCoverImageChange,
    onIsReadmeCheckChange
  } = useEdit(formatArticleResponse(editorData!))

  const handleSubmit = () => {
    update({
      content,
      title,
      category,
      coverImage,
      _id: String(query.id),
      isReadme
    })
  }

  const [articleInfoModalOpen, setIsArticleInfoModalOpen] = useState(false)

  const onArticleInfoModalOpen = () => setIsArticleInfoModalOpen(true)
  const handleClose = () => {
    reset({ exclude: ['content'] })
    setIsArticleInfoModalOpen(false)
  }

  if (!editorData) return null

  return (
    <>
      <PageLoading open={isLoading} />
      <Stack>
        <ArticleInfoModal
          open={articleInfoModalOpen}
          title={title}
          category={category}
          coverImage={coverImage}
          isReadme={isReadme}
          onTitleChange={onTitleChange}
          onCategoryChange={onCategoryChange}
          onIsReadmeCheckChange={onIsReadmeCheckChange}
          onCoverImageChange={onCoverImageChange}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
        <ContentEditor
          value={content}
          onChange={onContentChange}
          onArticleInfoModalOpen={onArticleInfoModalOpen}
        />
      </Stack>
    </>
  )
}

export default Editor

export const getServerSideProps: GetServerSideProps<{
  articleData: ArticleEditResponse
}> = async ({ req, res, params }) => {
  const id = params?.id as string

  if (!isValidObjectId(id) || !isAdmin({ req, res })) {
    return {
      notFound: true
    }
  }
  try {
    const result = await getArticleById(id)

    if (!result) {
      return {
        notFound: true
      }
    }

    const articleData = serialize(exclude(result, ['updateTime']))

    return {
      props: {
        articleData
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
