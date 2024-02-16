import { ReactNode } from 'react'

import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { muiThemeConf } from '@/shared/constants/conf/mui-theme'
import { reactQueryConf } from '@/shared/constants/conf/react-query'

import EmotionThemeProvider from './emotion-theme-provider'
import GlobalStateProvider from './global-state-provider'

const AppProvider = ({ children }: { children: ReactNode }) => {
  const muiTheme = createTheme(muiThemeConf)
  const queryClient = new QueryClient(reactQueryConf)

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider>
        <EmotionThemeProvider>
          <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
        </EmotionThemeProvider>
      </GlobalStateProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default AppProvider
