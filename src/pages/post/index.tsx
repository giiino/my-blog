import dynamic from 'next/dynamic'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { Content, PostMenu, PostWrapper } from '@/features/post/components'
import { getReadmePost } from '@/pages/api/post/get'
import SEO from '@/shared/components/lib/SEO'
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

const PostIndexPage = ({
  postData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { title, content, coverImage } = postData
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

export default PostIndexPage

export const getServerSideProps: GetServerSideProps<{
  postData: Omit<PostResponse, 'isReadme'>
}> = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=86400'
  )
  try {
    const postData = await getReadmePost()

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
