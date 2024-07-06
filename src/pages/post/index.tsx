import dynamic from 'next/dynamic'
import { GetStaticProps, InferGetServerSidePropsType } from 'next/types'

import { Content, PostMenu, PostWrapper } from '@/features/post/components'
import { getReadmePost } from '@/pages/api/post/get'
import SEO from '@/shared/components/lib/SEO'
import { PostResponse } from '@/shared/types/api/post'
import { exclude, markdownToTxt, serialize } from '@/shared/utils/format'

const TocHolder = dynamic(
  import('@/features/post/components/toc-holder').then(
    ({ TocHolder }) => TocHolder
  ),
  {
    ssr: false
  }
)

const PostIndexPage = ({
  postData
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
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

export const getStaticProps: GetStaticProps<{
  postData: Omit<PostResponse, 'isReadme'>
}> = async () => {
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
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
