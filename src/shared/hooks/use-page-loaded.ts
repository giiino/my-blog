import { useLayoutEffect } from 'react'

import { useRouter } from 'next/router'

export const usePageLoaded = () => {
  const { asPath } = useRouter()

  useLayoutEffect(() => {
    const splitedArr = asPath.split('#')
    const titleId = splitedArr.at(-1)
    const targetElement = document.getElementById(
      decodeURIComponent(titleId || '')
    )
    if (!targetElement || !titleId) return

    targetElement.scrollIntoView({ behavior: 'instant' })
  }, [asPath])
}
