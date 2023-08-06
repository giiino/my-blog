import { PropsWithChildren } from 'react'

import Head from 'next/head'

type SEOProps = PropsWithChildren<
  Record<'description' | 'title', undefined | string>
>

export default function SEO({ description, title, children }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={title} />
      {children}
    </Head>
  )
}
