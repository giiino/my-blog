import React, { ReactNode, createContext, useContext, useState } from 'react'

import { useUser } from '@/shared/hooks/use-queries'
import { UserInfo } from '@/shared/types/api/login'

import { ThemeMode } from '../types/ui'

interface ContextProps {
  userInfo: UserInfo | undefined
  themeMode: ThemeMode | undefined
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode | undefined>>
}

const GlobalStateContext = createContext<ContextProps | undefined>(undefined)

GlobalStateContext.displayName = 'GlobalStateContext'

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode | undefined>(() => {
    const mode = getInitialColorMode()
    return mode
  })
  const { data: userInfo } = useUser()

  return (
    <GlobalStateContext.Provider value={{ userInfo, themeMode, setThemeMode }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error('useGlobalState只允許在GlobalStateProvider包裹下使用')
  }
  return context
}

function getInitialColorMode() {
  if (typeof window === 'undefined') {
    return undefined
  }
  const themeMode = window.localStorage.getItem(
    'theme-mode'
  ) as ThemeMode | null

  if (themeMode === 'light' || themeMode === 'dark') {
    return themeMode
  }

  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasDeviceThemeMode = typeof mql.matches === 'boolean'
  if (hasDeviceThemeMode) {
    return mql.matches ? 'dark' : 'light'
  }
  return 'light'
}
