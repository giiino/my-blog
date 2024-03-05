import { useState } from 'react'

import { ContentEditor } from '@/features/edit/components/editor'
import { PostInfoModal } from '@/features/edit/components/post-info-modal'
import { useEdit } from '@/features/edit/hooks/use-edit'
import { usePublishPost } from '@/features/edit/hooks/use-mutations'
import { withAdminPage } from '@/shared/HOC/with-admin-check'

const Editor = () => {
  const { mutate: publish } = usePublishPost()
  const {
    post: { id, content, title, category, coverImage, isReadme },
    reset,
    onCategoryChange,
    onIdChange,
    onTitleChange,
    onContentChange,
    onCoverImageChange,
    onIsReadmeCheckChange
  } = useEdit()
  const handleSubmit = () => {
    publish({ id, content, title, category, coverImage, isReadme })
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
        editId={id}
        open={postInfoModalOpen}
        title={title}
        category={category}
        isReadme={isReadme}
        coverImage={coverImage}
        onTitleChange={onTitleChange}
        onCategoryChange={onCategoryChange}
        onIdChange={onIdChange}
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
