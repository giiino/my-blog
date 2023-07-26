import { Backdrop, Button, CircularProgress, Stack } from '@mui/material'

import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { usePublishArticle } from '@/features/editor/hooks/use-mutations'
import { useCategories } from '@/features/editor/hooks/use-queries'
import { useEdit } from '@/features/editor/hooks/useEdit'

const Editor = () => {
  const { mutate: publish, isLoading } = usePublishArticle()
  const { data: categories } = useCategories()
  const {
    article: { content, title, category },
    onCategoryChange,
    onTitleChange,
    onContentChange
  } = useEdit()
  const handleSubmit = () => publish({ content, title, category })

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Stack sx={{ mt: 8 }}>
        <TitleEditor
          title={title}
          category={category}
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
        />
        <ContentEditor value={content} onChange={onContentChange} />
      </Stack>
    </>
  )
}

export default Editor
