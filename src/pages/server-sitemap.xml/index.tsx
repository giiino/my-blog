import { GetServerSideProps } from 'next'
import { getServerSideSitemapLegacy } from 'next-sitemap'

import { getAllPosts } from '../api/post/get/all'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postsData = await getAllPosts()
  const fields = postsData.map((post) => {
    if (post.isReadme)
      return {
        loc: `${process.env.SITE_URL}/post`,
        lastmod: new Date(post.createTime).toISOString()
      }

    return {
      loc: `${process.env.SITE_URL}/post/${post.id}`,
      lastmod: new Date(post.createTime).toISOString()
    }
  })

  return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
