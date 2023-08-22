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
      <SEO />
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
