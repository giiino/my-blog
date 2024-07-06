import { useEffect } from 'react'

import dynamic from 'next/dynamic'
import { GetStaticProps, InferGetServerSidePropsType } from 'next/types'

import { Content, PostMenu, PostWrapper } from '@/features/post/components'
import { getPostById } from '@/pages/api/post/get'
import SEO from '@/shared/components/lib/SEO'
import { useCategory } from '@/shared/store/use-category'
import { PostResponse } from '@/shared/types/api/post'
import { exclude, markdownToTxt, serialize } from '@/shared/utils/format'

import { getAllPosts } from '../api/post/get/all'

const TocHolder = dynamic(
  import('@/features/post/components/toc-holder').then(
    ({ TocHolder }) => TocHolder
  ),
  {
    ssr: false
  }
)

const PostPage = ({
  postData
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { setPostCategory } = useCategory()
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
        <PostMenu item lg={3} md={4} />
        <Content item lg={7} md={8} xs={12} post={postData} />
        <TocHolder item lg={2} />
      </PostWrapper>
    </>
  )
}

export default PostPage

export async function getStaticPaths() {
  const posts = await getAllPosts()

  const paths = posts?.map(({ id }) => ({
    params: { id }
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<{
  postData: Omit<PostResponse, 'isReadme'>
}> = async ({ params }) => {
  const id = params?.id as string

  if (!id) {
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
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
