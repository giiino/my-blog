import { useState } from 'react'

import { ContentEditor } from '@/features/edit/components/editor'
import { PostInfoModal } from '@/features/edit/components/post-info-modal'
import { useEdit } from '@/features/edit/hooks/use-edit'
import { usePublishPost } from '@/features/edit/hooks/use-mutations'
import { withAdminPage } from '@/shared/HOC/with-admin-check'

const Editor = () => {
  const { mutate: publish } = usePublishPost()
  const {
    post: { content, title, category, coverImage, isReadme },
    reset,
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onCoverImageChange,
    onIsReadmeCheckChange
  } = useEdit()
  const handleSubmit = () => {
    publish({ content, title, category, coverImage, isReadme })
  }

  const [postInfoModalOpen, setIsPostInfoModalOpen] = useState(false)

  const onPostInfoModalOpen = () => setIsPostInfoModalOpen(true)
  const handleClose = () => {
    reset({ exclude: ['content'] })
    setIsPostInfoModalOpen(false)
  }

  return (
    <>
      <PostInfoModal
        open={postInfoModalOpen}
        title={title}
        category={category}
        isReadme={isReadme}
        coverImage={coverImage}
        onTitleChange={onTitleChange}
        onCategoryChange={onCategoryChange}
        onCoverImageChange={onCoverImageChange}
        onIsReadmeCheckChange={onIsReadmeCheckChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <ContentEditor
        value={content}
        onChange={onContentChange}
        onPostInfoModalOpen={onPostInfoModalOpen}
      />
    </>
  )
}

export default withAdminPage(Editor)
