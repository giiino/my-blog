import React from 'react'

import { Stack } from '@mui/material'

import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { useEdit } from '@/features/editor/hooks/useEdit'

const Editors = () => {
  const {
    article: { content, title, category },
    onCategoryChange,
    onTitleChange,
    onContentChange,
    handlePublish
  } = useEdit()
  return (
    <Stack sx={{ mt: 8 }}>
      <TitleEditor
        title={title}
        category={category}
        onTitleChange={onTitleChange}
        onCategoryChange={onCategoryChange}
        handlePublish={handlePublish}
      />
      <ContentEditor value={content} onChange={onContentChange} />
    </Stack>
  )
}

export default Editors
