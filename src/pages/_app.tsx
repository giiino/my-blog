import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'

import { reactQueryConf } from '@/config/react-query.conf'
import { themeConf } from '@/config/theme.conf'
import Layout from '@/layout'
import SEO from '@/shared/components/SEO'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme(themeConf)
  const queryClient = new QueryClient(reactQueryConf)

  return (
    <>
      <SEO title='GN的程式開發小站' description={''}>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        <meta property='og:image' content='' />
      </SEO>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
