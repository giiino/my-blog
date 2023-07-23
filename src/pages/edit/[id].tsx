import { Stack } from '@mui/material'
import { useRouter } from 'next/router'

import { Article } from '@/db/entity/Article'
import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { useUpdateArticle } from '@/features/editor/hooks/use-mutations'
import { useEdit } from '@/features/editor/hooks/useEdit'
import { removeAttrsFromObject, serializeData } from '@/shared/utils/format'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'

import { getArticleById } from '../api/article/get'

const Editor = ({ articleData }: { articleData: Article }) => {
  const { query } = useRouter()
  const id = query.id as string
  const { mutate: update } = useUpdateArticle()
  const {
    article: { content, title, category },
    onCategoryChange,
    onTitleChange,
    onContentChange
  } = useEdit(articleData)

  const handleSubmit = () => update({ id, content, title, category })

  return (
    <Stack>
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

  const result = await getArticleById(id)

  if (!result) {
    return {
      notFound: true
    }
  }

  const articleData = serializeData(
    removeAttrsFromObject({
      target: result,
      removeAttrs: ['_id', 'create_time', 'is_delete', 'update_time', 'views']
    })
  )

  return {
    props: {
      articleData
    }
  }
}
