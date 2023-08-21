import { PropsWithChildren } from 'react'

import Head from 'next/head'

type SEOProps = PropsWithChildren<
  Partial<Record<'description' | 'title' | 'thumbnail', string>>
>

export default function SEO({
  description = '歡迎光臨，本站設立用以紀錄自己學習遇上問題解決的方式，或紀錄新知識的學習歷程。雖然本身是前端工程師，但網站涉及的範圍不只包含前端，也會有NodeJs、C#或DevOps等一切工作上需要，或是我有興趣學習的領域。',
  title = 'GN的程式小站',
  thumbnail = '/thumbnail.png',
  children
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width, user-scalable=no' />
      <meta property='og:image' content={thumbnail} />
      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={title} />
      {children}
    </Head>
  )
}
