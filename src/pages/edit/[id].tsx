import { Stack } from '@mui/material'

import { Article } from '@/db/entity/Article'
import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { useEdit } from '@/features/editor/hooks/useEdit'
import { serializeData } from '@/shared/utils/format'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'

import { getArticleById } from '../api/article/get'

const Editor = ({ articleData }: { articleData: Article }) => {
  const {
    article: { content, title, category },
    onCategoryChange,
    onTitleChange,
    onContentChange,
    handleSubmit
  } = useEdit(articleData)

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

export async function getServerSideProps(context: any) {
  const id = context.params.id
  if (!isValidObjectId(id)) {
    return {
      notFound: true
    }
  }

  const articleData = await getArticleById(id)

  if (!articleData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      articleData: serializeData(articleData)
    }
  }
}
