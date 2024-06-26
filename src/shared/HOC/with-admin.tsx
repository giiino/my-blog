import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useUser } from '../hooks/use-queries'

/**用於page展示與否 */
export const withAdmin = <T extends {}>(
  WrappedComponent: React.ComponentType<T>
) => {
  return (props: T) => {
    const { data: userInfo } = useUser()
    const { replace } = useRouter()
    const isAdmin = userInfo?.isAdmin || process.env.NODE_ENV === 'development'

    useEffect(() => {
      if (!isAdmin) replace('/')
    }, [isAdmin, replace])

    if (!isAdmin) return null

    return <WrappedComponent {...props} />
  }
}
