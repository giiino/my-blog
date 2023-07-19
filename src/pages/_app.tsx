import { ThemeProvider, createTheme } from '@mui/material/styles'
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

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
// App.getInitialProps = async ({ ctx }: { ctx: any }) => {

//   return {}
// }
