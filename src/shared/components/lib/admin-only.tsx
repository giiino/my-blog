import { ReactNode } from 'react'

import { useUser } from '@/shared/hooks/use-queries'

export const AdminOnly = ({ children }: { children: ReactNode }) => {
  const { data: userInfo } = useUser()

  const isRender =
    userInfo?.isAdmin === 1 || process.env.NODE_ENV === 'development'

  if (isRender) return <>{children}</>

  return null
}
