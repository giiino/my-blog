import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

import { PostMenu, PostWrapper, Content } from '@/features/post/components'
import TocHolder from '@/features/post/components/TocHolder'
import { getReadmePost } from '@/pages/api/post/get'
import SEO from '@/shared/components/lib/SEO'
import { PostResponse, MenuCategoriesResponse } from '@/shared/types/api/post'
import { exclude, markdownToTxt, serialize } from '@/shared/utils/format'

import { getMenuCategories } from '../api/post/get/menu-categories'

const PostIndexPage = ({
  postData,
  menuCategories
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, content, coverImage } = postData
  return (
    <>
      <SEO
        title={title}
        description={markdownToTxt(content, 150)}
        thumbnail={coverImage}
      />
      <PostWrapper justifyContent={'center'} container>
        <PostMenu item lg={3} md={4} menuCategories={menuCategories} />
        <Content item lg={7} md={8} xs={12} post={postData} />
        <TocHolder item lg={2} />
      </PostWrapper>
    </>
  )
}

export default PostIndexPage

export const getStaticProps: GetStaticProps<{
  postData: Omit<PostResponse, 'isReadme'>
  menuCategories: MenuCategoriesResponse[]
}> = async () => {
  try {
    const [postData, menuCategories] = await Promise.all([
      getReadmePost(),
      getMenuCategories()
    ])

    if (!postData) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        postData: serialize(exclude(postData, ['isReadme'])),
        menuCategories: serialize(menuCategories)
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}