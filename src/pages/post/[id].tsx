import { useEffect } from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { Content, PostMenu, PostWrapper } from '@/features/post/components'
import TocHolder from '@/features/post/components/toc-holder'
import { getPostById } from '@/pages/api/post/get'
import SEO from '@/shared/components/lib/SEO'
import { useGlobalState } from '@/shared/providers/global-state-provider'
import {
  MenuCategoriesResponse,
  PostCardResponse,
  PostResponse
} from '@/shared/types/api/post'
import { isValidObjectId } from '@/shared/utils/check'
import { exclude, markdownToTxt, serialize } from '@/shared/utils/format'

import { getMenuCategories } from '../api/post/get/menu-categories'
import { getRelatedPosts } from '../api/post/get/related'

const PostPage = ({
  postData,
  menuCategories,
  relatedPost
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setPostCategory } = useGlobalState()
  const { title, content, coverImage, category } = postData

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
        <PostMenu item lg={3} md={4} menuCategories={menuCategories} />
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
  menuCategories: MenuCategoriesResponse[]
  relatedPost: PostCardResponse[]
}> = async ({ params }) => {
  const id = params?.id as string

  if (!isValidObjectId(id)) {
    return {
      notFound: true
    }
  }

  try {
    const [postData, menuCategories, relatedPost] = await Promise.all([
      getPostById(id, true),
      getMenuCategories(),
      getRelatedPosts(id)
    ])

    if (!postData) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        postData: serialize(exclude(postData, ['isReadme'])),
        menuCategories: serialize(menuCategories),
        relatedPost: serialize(relatedPost)
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
