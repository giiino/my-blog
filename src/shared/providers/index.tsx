import { ReactNode } from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { reactQueryConf } from '@/shared/constants/conf/react-query'
import { themeConf } from '@/shared/constants/conf/theme'

import GlobalStateProvider from './global-state.provider'

const AppProvider = ({ children }: { children: ReactNode }) => {
  const theme = createTheme(themeConf)
  const queryClient = new QueryClient(reactQueryConf)
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </GlobalStateProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default AppProvider
