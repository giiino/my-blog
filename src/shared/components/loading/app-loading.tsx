import { useEffect, useState } from 'react'

import { useIsMutating } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { PageLoading } from './page-loading'

export const AppLoading = () => {
  const [isPageChangeLoading, setIsPageChangeLoading] = useState(false)
  const { events } = useRouter()
  const isMutating = useIsMutating()

  const isLoading = isPageChangeLoading || isMutating !== 0

  useEffect(() => {
    events.on('routeChangeStart', () => setIsPageChangeLoading(true))
    events.on('routeChangeComplete', () => setIsPageChangeLoading(false))
    events.on('routeChangeError', () => setIsPageChangeLoading(false))
    return () => {
      events.off('routeChangeStart', () => setIsPageChangeLoading(true))
      events.off('routeChangeComplete', () => setIsPageChangeLoading(false))
      events.off('routeChangeError', () => setIsPageChangeLoading(false))
    }
  }, [events])

  return <PageLoading open={isLoading} />
}
