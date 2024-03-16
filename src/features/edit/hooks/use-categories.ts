import { useMemo } from 'react'

import { useMenuCategory } from '@/shared/hooks/use-queries'

export const useCategories = () => {
  const { data } = useMenuCategory()
  return useMemo(() => {
    return data?.map(({ category }) => category)
  }, [data])
}
