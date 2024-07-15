import { PropsWithChildren } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

type SEOProps = PropsWithChildren<
  Partial<Record<'description' | 'title' | 'thumbnail', string>>
>

export default function SEO({
  description = '歡迎光臨，本站設立用以紀錄自己學習遇上問題解決的方式，或紀錄新知識的學習歷程。雖然本身是前端工程師，但網站涉及的範圍不只包含前端，也會有NodeJs、C#或DevOps等一切工作上需要，或是我有興趣學習的領域。',
  title = 'GN DEV | 程式小站',
  thumbnail = '/thumbnail.png',
  children
}: SEOProps) {
  const router = useRouter()
  return (
    <Head>
      <title key='title'>{title}</title>
      <meta name='viewport' content='width=device-width, user-scalable=no' />
      <meta property='og:image' content={thumbnail} key='thumbnail' />
      <meta name='description' content={description} key='description' />
      <meta property='og:type' content='website' key='og:type' />
      <meta property='og:title' content={title} key='og:title' />
      <meta
        property='og:description'
        content={description}
        key='og:description'
      />
      <meta
        property='og:site_name'
        content='GN DEV | 程式小站'
        key='og:site_name'
      />
      <meta
        name='google-site-verification'
        content='PsaJaezT8BzRXSDjpN6XAfp-gFHTyGcvPIjScMFo9M4'
      />
      <link
        rel='icon'
        type='image/x-icon'
        href='/favicon.ico'
        key='link-image/x-icon'
      />
      <link
        rel='icon'
        type='image/png'
        href='/favicon.ico'
        key='link-image/png'
      />
      <link
        rel='apple-touch-icon'
        href='/favicon.ico'
        key='link-apple-touch-icon'
      />
      <link
        rel='canonical'
        href={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`}
        key='canonical'
      />
      {children}
    </Head>
  )
}
