import { useEffect } from 'react'

import { useRouter } from 'next/router'

export const usePageLoaded = () => {
  const { asPath } = useRouter()

  useEffect(() => {
    const splitedArr = asPath.split('#')
    const titleId = splitedArr.at(-1)
    const targetElement = document.getElementById(
      decodeURIComponent(titleId || '')
    )
    if (!targetElement || !titleId) return

    targetElement.scrollIntoView({ behavior: 'instant' })
  }, [asPath])
}
