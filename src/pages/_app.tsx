import { Toaster } from 'react-hot-toast'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { AppProps } from 'next/app'

import Layout from '@/layout'
import AppProvider from '@/providers'
import { AppLoading } from '@/shared/components/AppLoading'
import SEO from '@/shared/components/SEO'
import '@/styles/globals.css'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Taipei')

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO title='GN的程式小站' description={''}>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        <meta property='og:image' content='/thumbnail.png' />
      </SEO>
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
