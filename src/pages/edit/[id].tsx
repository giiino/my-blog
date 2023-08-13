import { Backdrop, Button, CircularProgress, Stack } from '@mui/material'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { ContentEditor } from '@/features/editor/components/ContentEditor'
import { TitleEditor } from '@/features/editor/components/TitleEditor'
import { useUpdateArticle } from '@/features/editor/hooks/use-mutations'
import { useEdit } from '@/features/editor/hooks/useEdit'
import { formatArticleResponse } from '@/features/editor/utils/formatter'
import { exclude, serializeData } from '@/shared/utils/format'
import { isValidObjectId } from '@/shared/utils/isValidObjectId'
import { checkIsAdmin } from '@/shared/utils/jwt.util'

import { ArticleEditResponse } from '../api/article'
import { getArticleById } from '../api/article/get/article'

const Editor = ({
  articleData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { _id, ...restArticleData } = articleData
  const { mutate: update, isLoading } = useUpdateArticle()
  const {
    article: { content, title, category, isReadme },
    onCategoryChange,
    onTitleChange,
    onContentChange,
    onIsReadmeCheckChange
  } = useEdit({ ...formatArticleResponse(restArticleData) })
  const handleSubmit = () =>
    update({ content, title, category, _id: String(_id), isReadme })

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
              儲存
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

export const getServerSideProps: GetServerSideProps<{
  articleData: ArticleEditResponse
}> = async ({ req, res, params }) => {
  const id = params?.id as string

  if (!isValidObjectId(id) || !checkIsAdmin({ req, res })) {
    return {
      notFound: true
    }
  }

  try {
    const result = await getArticleById(id)

    if (!result) {
      return {
        notFound: true
      }
    }

    const articleData = serializeData(exclude(result, ['updateTime']))

    return {
      props: {
        articleData
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
