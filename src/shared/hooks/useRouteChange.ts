import { useEffect } from 'react'

import { useRouter } from 'next/router'

export const useRouteChange = ({ callback }: { callback: () => void }) => {
  const { events } = useRouter()

  useEffect(() => {
    events.on('routeChangeComplete', () => callback())
    return () => {
      events.off('routeChangeComplete', () => callback())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])
}
