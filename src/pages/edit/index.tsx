import { Button, Stack } from '@mui/material'
import { GetServerSideProps } from 'next'

import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { usePublishArticle } from '@/features/editor/hooks/use-mutations'
import { useEdit } from '@/features/editor/hooks/useEdit'
import { isAdmin } from '@/shared/utils/jwt'

const Editor = () => {
  const { mutate: publish, isLoading } = usePublishArticle()
  const {
    article: { content, title, category, coverImage, isReadme },
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onIsReadmeCheckChange
  } = useEdit()
  const handleSubmit = () =>
    publish({ content, title, category, coverImage, isReadme })

  return (
    <>
      <Stack>
        <TitleEditor
          title={title}
          category={category}
          isReadme={isReadme}
          submitButton={
            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              發布
            </Button>
          }
          onTitleChange={onTitleChange}
          onCategoryChange={onCategoryChange}
          onIsReadmeCheckChange={onIsReadmeCheckChange}
        />
        <ContentEditor value={content} onChange={onContentChange} />
      </Stack>
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
