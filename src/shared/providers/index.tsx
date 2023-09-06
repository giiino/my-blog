import { ReactNode } from 'react'

import { ThemeProvider as StyledThemeProvider } from '@emotion/react'
import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { muiThemeConf } from '@/shared/constants/conf/muiTheme'
import { reactQueryConf } from '@/shared/constants/conf/react-query'

import { styledThemeConf } from '../constants/conf/emotionTheme'
import { LOCALSOTRAGE_THEME_KEY } from '../constants/ui'
import useLocalStorage from '../hooks/useLocalStorage'
import { ThemeMode } from '../types/ui'
import GlobalStateProvider from './global-state.provider'

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useLocalStorage<ThemeMode>(
    LOCALSOTRAGE_THEME_KEY,
    'light'
  )
  const muiTheme = createTheme(muiThemeConf)
  const queryClient = new QueryClient(reactQueryConf)
  const emotionTheme = styledThemeConf(mode)

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light')
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider>
        <StyledThemeProvider theme={emotionTheme}>
          <MuiThemeProvider theme={muiTheme}>
            <button onClick={toggleMode}>54</button>
            {children}
          </MuiThemeProvider>
        </StyledThemeProvider>
      </GlobalStateProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default AppProvider
