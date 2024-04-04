import { useEffect } from 'react'

import dynamic from 'next/dynamic'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { Content, PostMenu, PostWrapper } from '@/features/post/components'
import { getPostById } from '@/pages/api/post/get'
import SEO from '@/shared/components/lib/SEO'
import { useCategory } from '@/shared/store/use-category'
import { PostResponse } from '@/shared/types/api/post'
import { exclude, markdownToTxt, serialize } from '@/shared/utils/format'

const TocHolder = dynamic(
  import('@/features/toc/components/toc-holder').then(
    ({ TocHolder }) => TocHolder
  ),
  {
    ssr: false
  }
)

const PostPage = ({
  postData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

export const getServerSideProps: GetServerSideProps<{
  postData: Omit<PostResponse, 'isReadme'>
}> = async ({ params, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=86400'
  )
  const id = params?.id as string | undefined

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
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
