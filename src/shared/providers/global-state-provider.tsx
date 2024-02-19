import React, { createContext, ReactNode, useContext, useState } from 'react'

import { ThemeMode } from '../types/ui'

interface ContextProps {
  themeMode: ThemeMode | undefined
  postCategory: string
  setPostCategory: React.Dispatch<React.SetStateAction<string>>
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode | undefined>>
}

const GlobalStateContext = createContext<ContextProps | undefined>(undefined)

GlobalStateContext.displayName = 'GlobalStateContext'

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode | undefined>(undefined)
  const [postCategory, setPostCategory] = useState('')

  return (
    <GlobalStateContext.Provider
      value={{
        themeMode,
        postCategory,
        setPostCategory,
        setThemeMode
      }}
    >
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
