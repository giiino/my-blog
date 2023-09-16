import { useState } from 'react'

import { Stack } from '@mui/material'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { ArticleInfoModal } from '@/features/editor/components/ArticleInfoModal'
import { ContentEditor } from '@/features/editor/components/Editor'
import { useUpdateArticle } from '@/features/editor/hooks/use-mutations'
import { useEdit } from '@/features/editor/hooks/useEdit'
import { formatArticleResponse } from '@/features/editor/utils/format'
import { isValidObjectId } from '@/shared/utils/check'
import { exclude, serializeData } from '@/shared/utils/format'
import { isAdmin } from '@/shared/utils/jwt'

import { ArticleEditResponse } from '../../shared/types/api/article'
import { getArticleById } from '../api/article/get'

const Editor = ({
  articleData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { _id, ...restArticleData } = articleData
  const { mutate: update } = useUpdateArticle()
  const {
    article: { content, title, category, isReadme, coverImage },
    reset,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onCoverImageChange,
    onIsReadmeCheckChange
  } = useEdit({ ...formatArticleResponse(restArticleData) })
  const handleSubmit = () => {
    update({ content, title, category, coverImage, _id: String(_id), isReadme })
  }

  const [articleInfoModalOpen, setIsArticleInfoModalOpen] = useState(false)

  const onArticleInfoModalOpen = () => setIsArticleInfoModalOpen(true)
  const handleClose = () => {
    reset({ exclude: ['content'] })
    setIsArticleInfoModalOpen(false)
  }

  return (
    <>
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

    const articleData = serializeData(exclude(result, ['updateTime']))

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
