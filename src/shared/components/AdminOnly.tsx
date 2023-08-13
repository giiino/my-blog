import { ReactNode } from 'react'

import { useGlobalState } from '@/providers/global-state.provider'

export const AdminOnly = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useGlobalState()
  const isRender = userInfo?.isAdmin === 1
  // const isRender =
  //   userInfo?.isAdmin === 1 || process.env.NODE_ENV === 'development'

  if (isRender) {
    return <>{children}</>
  }
  return null
}
