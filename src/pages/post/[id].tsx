import { useEffect } from 'react'

import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

import { PostMenu, PostWrapper, Content } from '@/features/post/components'
import TocHolder from '@/features/post/components/TocHolder'
import { getPostById } from '@/pages/api/post/get'
import SEO from '@/shared/components/lib/SEO'
import { useGlobalState } from '@/shared/providers/GlobalStateProvider'
import {
  PostCardResponse,
  PostResponse,
  MenuCategoriesResponse
} from '@/shared/types/api/post'
import { isValidObjectId } from '@/shared/utils/check'
import { exclude, markdownToTxt, serialize } from '@/shared/utils/format'

import { getAllPosts } from '../api/post/get/all'
import { getMenuCategories } from '../api/post/get/menu-categories'
import { getRelatedPosts } from '../api/post/get/related'

const PostPage = ({
  postData,
  menuCategories,
  relatedPost
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export async function getStaticPaths() {
  const posts = await getAllPosts()

  const paths = posts?.map(({ _id }) => ({
    params: { id: String(_id) }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{
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
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
