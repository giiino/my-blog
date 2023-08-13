import type { AppProps } from 'next/app'

import Layout from '@/layout'
import AppProvider from '@/providers'
import SEO from '@/shared/components/SEO'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO title='GN的程式開發小站' description={''}>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        <meta property='og:image' content='' />
      </SEO>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  )
}
