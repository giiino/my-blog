import { Stack } from '@mui/material'

import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { useEdit } from '@/features/editor/hooks/useEdit'

const Editor = () => {
  const {
    article: { content, title, category },
    onCategoryChange,
    onTitleChange,
    onContentChange,
    handleSubmit
  } = useEdit()

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
