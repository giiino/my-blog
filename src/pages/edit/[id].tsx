import { useState } from 'react'

import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'

import { ContentEditor } from '@/features/editor/components/Editor'
import { PostInfoModal } from '@/features/editor/components/post-info-modal'
import { useEdit } from '@/features/editor/hooks/use-edit'
import { useUpdatePost } from '@/features/editor/hooks/use-mutations'
import { useEditorData } from '@/features/editor/hooks/use-queries'
import { PageLoading } from '@/shared/components/loading/page-loading'
import { PostEditResponse } from '@/shared/types/api/post'
import { isValidObjectId } from '@/shared/utils/check'
import { exclude, serialize } from '@/shared/utils/format'
import { isAdmin } from '@/shared/utils/jwt'

import { getPostById } from '../api/post/get'

const Editor = () => {
  const { query } = useRouter()
  const { data: editorData, isLoading } = useEditorData(query.id as string)
  const { mutate: update } = useUpdatePost()

  const {
    post: { content, title, category, isReadme, coverImage },
    reset,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onCoverImageChange,
    onIsReadmeCheckChange
  } = useEdit(editorData)

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

  const [postInfoModalOpen, setIsPostInfoModalOpen] = useState(false)

  const onPostInfoModalOpen = () => setIsPostInfoModalOpen(true)
  const handleClose = () => {
    reset({ exclude: ['content'] })
    setIsPostInfoModalOpen(false)
  }

  if (isLoading) return <PageLoading open={isLoading} />

  if (!editorData) return null
  return (
    <>
      <Stack>
        <PostInfoModal
          open={postInfoModalOpen}
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
          onPostInfoModalOpen={onPostInfoModalOpen}
        />
      </Stack>
    </>
  )
}

export default Editor

export const getServerSideProps: GetServerSideProps<{
  postData: PostEditResponse
}> = async ({ req, res, params }) => {
  const id = params?.id as string

  if (!isValidObjectId(id) || !isAdmin({ req, res })) {
    return {
      notFound: true
    }
  }
  try {
    const result = await getPostById(id)

    if (!result) {
      return {
        notFound: true
      }
    }

    const postData = serialize(exclude(result, ['updateTime']))

    return {
      props: {
        postData: postData
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
