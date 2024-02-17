import { useEffect } from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { Content, PostMenu, PostWrapper } from '@/features/post/components'
import TocHolder from '@/features/post/components/toc-holder'
import { useRelatedPosts } from '@/features/post/hooks/use-queries'
import { getPostById } from '@/pages/api/post/get'
import SEO from '@/shared/components/lib/SEO'
import { useGlobalState } from '@/shared/providers/global-state-provider'
import { PostResponse } from '@/shared/types/api/post'
import { isValidObjectId } from '@/shared/utils/check'
import { exclude, markdownToTxt, serialize } from '@/shared/utils/format'

const PostPage = ({
  postData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setPostCategory } = useGlobalState()
  const { title, content, coverImage, category } = postData
  const { data: relatedPost } = useRelatedPosts()
  useEffect(() => {
    setPostCategory(category)
  }, [category, setPostCategory])

  return (
    <>
      <SEO
        title={title}
        description={markdownToTxt(content, 150)}
        thumbnail={coverImage}
      />
      <PostWrapper justifyContent={'center'} container>
        <PostMenu item lg={3} md={4} />
        <Content
          item
          lg={7}
          md={8}
          xs={12}
          post={postData}
          relatedPost={relatedPost}
        />
        <TocHolder item lg={2} />
      </PostWrapper>
    </>
  )
}

export default PostPage

export const getServerSideProps: GetServerSideProps<{
  postData: Omit<PostResponse, 'isReadme'>
}> = async ({ params }) => {
  const id = params?.id as string

  if (!isValidObjectId(id)) {
    return {
      notFound: true
    }
  }

  try {
    const postData = await getPostById(id, true)
    if (!postData) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        postData: serialize(exclude(postData, ['isReadme']))
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
