import { ReactNode } from 'react'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import MuiThemeProvider from './mui-theme-provider'
import ReactQueryProvider from './react-query-provider'

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <MuiThemeProvider>{children}</MuiThemeProvider>
      <ReactQueryDevtools />
    </ReactQueryProvider>
  )
}

export default AppProvider
