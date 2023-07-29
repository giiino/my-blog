import { Backdrop, Button, CircularProgress, Stack } from '@mui/material'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { useUpdateArticle } from '@/features/editor/hooks/use-mutations'
import { useEdit } from '@/features/editor/hooks/useEdit'
import { removeAttrsFromObject, serializeData } from '@/shared/utils/format'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'

import { ArticleEditResponse } from '../api/article'
import { getArticleById } from '../api/article/get-article'

const Editor = ({
  articleData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { _id, ...restArticleData } = articleData
  const { mutate: update, isLoading } = useUpdateArticle()
  const {
    article: { content, title, category },
    onCategoryChange,
    onTitleChange,
    onContentChange
  } = useEdit({ ...restArticleData })
  const handleSubmit = () =>
    update({ content, title, category, _id: String(_id) })

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
          submitButton={
            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              儲存
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

export const getServerSideProps: GetServerSideProps<{
  articleData: ArticleEditResponse
}> = async (context) => {
  const id = context?.params?.id as string

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
      removeAttrs: ['update_time']
    })
  )

  return {
    props: {
      articleData
    }
  }
}
