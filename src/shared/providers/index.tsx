import { ReactNode } from 'react'

import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dynamic from 'next/dynamic'

import { muiThemeConf } from '@/shared/constants/conf/muiTheme'
import { reactQueryConf } from '@/shared/constants/conf/react-query'

import EmotionThemeProvider from './EmotionThemeProvider'
import GlobalStateProvider from './GlobalStateProvider'

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
