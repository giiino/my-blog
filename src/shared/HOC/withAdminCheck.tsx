import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useGlobalState } from '../providers/GlobalStateProvider'

export const withAdminCheck = <T extends {}>(
  WrappedComponent: React.ComponentType<T>
) => {
  return (props: T) => {
    const { userInfo } = useGlobalState()
    const { replace } = useRouter()
    const isAdmin =
      userInfo?.isAdmin === 1 || process.env.NODE_ENV === 'development'

    useEffect(() => {
      if (!isAdmin) replace('/')
    }, [isAdmin, replace])

    if (!isAdmin) return null

    return <WrappedComponent {...props} />
  }
}
