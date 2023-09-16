import { useState } from 'react'

import { GetServerSideProps } from 'next'

import { ArticleInfoModal } from '@/features/editor/components/ArticleInfoModal'
import { ContentEditor } from '@/features/editor/components/Editor'
import { usePublishArticle } from '@/features/editor/hooks/use-mutations'
import { useEdit } from '@/features/editor/hooks/useEdit'
import { isAdmin } from '@/shared/utils/jwt'

const Editor = () => {
  const { mutate: publish } = usePublishArticle()
  const {
    article: { content, title, category, coverImage, isReadme },
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

  const [articleInfoModalOpen, setIsArticleInfoModalOpen] = useState(false)

  const onArticleInfoModalOpen = () => setIsArticleInfoModalOpen(true)
  const handleClose = () => {
    reset({ exclude: ['content'] })
    setIsArticleInfoModalOpen(false)
  }

  return (
    <>
      <ArticleInfoModal
        open={articleInfoModalOpen}
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
        onArticleInfoModalOpen={onArticleInfoModalOpen}
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
