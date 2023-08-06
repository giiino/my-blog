import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

import Layout from '@/layout'
import SEO from '@/shared/components/SEO'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    components: {
      MuiListItemButton: {
        defaultProps: {
          disableTouchRipple: true
        }
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1100,
        xl: 1536
      }
    }
    // palette: {
    //   mode: 'dark'
    // }
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0
      }
    }
  })
  return (
    <>
      <SEO title='GN的程式開發筆記' description={''}>
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        <meta property='og:image' content='' />
      </SEO>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}
// App.getInitialProps = async ({ ctx }: { ctx: any }) => {

//   return {}
// }
