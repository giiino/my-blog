import React, { ReactNode, createContext, useContext } from 'react'

import { useUser } from '@/shared/hooks/use-queries'
import { UserInfo } from '@/shared/types/api/login'

interface ContextProps {
  userInfo: UserInfo | undefined
}

const GlobalStateContext = createContext<ContextProps | undefined>(undefined)

GlobalStateContext.displayName = 'GlobalStateContext'

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const { data: userInfo } = useUser()

  return (
    <GlobalStateContext.Provider value={{ userInfo }}>
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
