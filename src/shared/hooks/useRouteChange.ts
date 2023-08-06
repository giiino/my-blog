import { useEffect, useRef } from 'react'

import { useRouter } from 'next/router'

export const useRouteChange = ({ callback }: { callback: () => void }) => {
  const { asPath } = useRouter()
  const prevRoute = useRef(asPath)

  useEffect(() => {
    if (asPath !== prevRoute.current) {
      callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])
}
