import { useState } from 'react'

import { GetServerSideProps } from 'next'

import { ContentEditor } from '@/features/editor/components/Editor'
import { PostInfoModal } from '@/features/editor/components/post-info-modal'
import { useEdit } from '@/features/editor/hooks/use-edit'
import { usePublishPost } from '@/features/editor/hooks/use-mutations'
import { isAdmin } from '@/shared/utils/jwt'

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

export default Editor

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res
}) => {
  if (!isAdmin({ req, res })) {
    return {
      notFound: true
    }
  }

  return {
    props: {}
  }
}
