import { Stack } from '@mui/material'

import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { usePublishArticle } from '@/features/editor/hooks/use-mutations'
import { useEdit } from '@/features/editor/hooks/useEdit'

const Editor = () => {
  const { mutate: publish } = usePublishArticle()
  const {
    article: { content, title, category },
    onCategoryChange,
    onTitleChange,
    onContentChange
  } = useEdit()
  const handleSubmit = () => publish({ content, title, category })

  return (
    <Stack sx={{ mt: 8 }}>
      <TitleEditor
        title={title}
        category={category}
        onTitleChange={onTitleChange}
        onCategoryChange={onCategoryChange}
        handleSubmit={handleSubmit}
      />
      <ContentEditor value={content} onChange={onContentChange} />
    </Stack>
  )
}

export default Editor
