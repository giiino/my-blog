import 'react-markdown-editor-lite/lib/index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

import Layout from '@/layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    components: {
      MuiListItemButton: {
        defaultProps: {
          disableTouchRipple: true
        }
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
// App.getInitialProps = async ({ ctx }: { ctx: any }) => {

//   return {}
// }
