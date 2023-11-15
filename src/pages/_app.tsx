import { Toaster } from 'react-hot-toast'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Layout from '@/layout'
import { AppLoading } from '@/shared/components/loading/AppLoading'
import AppProvider from '@/shared/providers'
import '@/styles/globals.css'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Taipei')

const metaTag = {
  description:
    '歡迎光臨，本站設立用以紀錄自己學習遇上問題解決的方式，或紀錄新知識的學習歷程。雖然本身是前端工程師，但網站涉及的範圍不只包含前端，也會有NodeJs、C#或DevOps等一切工作上需要，或是我有興趣學習的領域。',
  title: 'GN DEV | 程式小站',
  thumbnail: '/thumbnail.png'
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title key='title'>{metaTag.title}</title>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        <meta property='og:image' content={metaTag.thumbnail} key='thumbnail' />
        <meta
          name='description'
          content={metaTag.description}
          key='description'
        />
        <meta property='og:type' content='website' key='og:type' />
        <meta property='og:title' content={metaTag.title} key='og:title' />
        <meta
          property='og:description'
          content={metaTag.description}
          key='og:description'
        />
        <meta
          property='og:site_name'
          content={metaTag.title}
          key='og:site_name'
        />
      </Head>
      <AppProvider>
        <Layout>
          <AppLoading />
          <Component {...pageProps} />
          <Toaster position='bottom-center' />
        </Layout>
      </AppProvider>
    </>
  )
}
