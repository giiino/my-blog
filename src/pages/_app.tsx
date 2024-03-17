import { Toaster } from 'react-hot-toast'

import { SpeedInsights } from '@vercel/speed-insights/next'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { AppProps } from 'next/app'

import Layout from '@/layout'
import { ToTopButton } from '@/shared/components/buttons/to-top-button'
import SEO from '@/shared/components/lib/SEO'
import { AppLoading } from '@/shared/components/loading/app-loading'
import AppProvider from '@/shared/providers'
import '@/styles/globals.css'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Taipei')

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SEO />
      <Layout>
        <AppLoading />
        <Component {...pageProps} />
        <Toaster position='bottom-center' />
        <ToTopButton />
      </Layout>
      <SpeedInsights />
    </AppProvider>
  )
}
