import { ReactNode } from 'react'

import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { muiThemeConf } from '@/shared/constants/conf/mui-theme'
import { reactQueryConf } from '@/shared/constants/conf/react-query'

const queryClient = new QueryClient(reactQueryConf)

const AppProvider = ({ children }: { children: ReactNode }) => {
  const muiTheme = createTheme(muiThemeConf)

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default AppProvider
