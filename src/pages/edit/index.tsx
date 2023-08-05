import { Backdrop, Button, CircularProgress, Stack } from '@mui/material'

import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { usePublishArticle } from '@/features/editor/hooks/use-mutations'
import { useEdit } from '@/features/editor/hooks/useEdit'

const Editor = () => {
  const { mutate: publish, isLoading } = usePublishArticle()
  const {
    article: { content, title, category, isReadme },
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onIsReadmeCheckChange
  } = useEdit()
  const handleSubmit = () => publish({ content, title, category, isReadme })

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
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
