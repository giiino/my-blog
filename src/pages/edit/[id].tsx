import { useState } from 'react'

import { Stack } from '@mui/material'
import { useRouter } from 'next/router'

import { ContentEditor } from '@/features/edit/components/Editor'
import { PostInfoModal } from '@/features/edit/components/post-info-modal'
import { useEdit } from '@/features/edit/hooks/use-edit'
import { useUpdatePost } from '@/features/edit/hooks/use-mutations'
import { useEditorData } from '@/features/edit/hooks/use-queries'
import { withAdminCheck } from '@/shared/HOC/withAdminCheck'
import { PageLoading } from '@/shared/components/loading/page-loading'

const Editor = () => {
  const { query } = useRouter()

  const { data: editorData, isLoading } = useEditorData(
    query.id as string | undefined
  )
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

export default withAdminCheck(Editor)
