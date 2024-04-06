import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { POST_MARKDOWN_ID } from '@/shared/constants/ui'
import { HeadingsData, useHeadings } from '@/shared/store/use-headings'
import { throttle } from '@/shared/utils/wrapper'

const getHeadings = (): HTMLElement[] => {
  const markdownElement = document.getElementById(POST_MARKDOWN_ID)
  if (!markdownElement) return []

  const headings = Array.from(
    markdownElement.querySelectorAll('h3, h4')
  ) as HTMLElement[]
  return headings
}

/**將headings資料寫入store */
export const useHeadingsData = () => {
  const { asPath } = useRouter()
  const { setHeadings } = useHeadings()

  useEffect(() => {
    const headings = getHeadings()
    const result: HeadingsData[] = []
    headings.forEach((heading) => {
      const { innerText: title, id, nodeName } = heading
      if (nodeName === 'H3') {
        result.push({ id, title, items: [] })
      } else if (nodeName === 'H4' && result.length > 0) {
        result[result.length - 1].items.push({ title, id })
      }
    })

    setHeadings(result)
  }, [asPath, setHeadings])
}

export const useActiveHeading = () => {
  const { asPath } = useRouter()
  const [activeHeading, setActiveHeading] = useState<string | undefined>(
    undefined
  )
  const windowHeight = useRef<number>(window.innerHeight)

  useEffect(() => {
    const headingElements = getHeadings()

    const handler = throttle(() => {
      let closestElement = headingElements[0]
      headingElements.forEach((element) => {
        if (!element) return
        const currentToTopDistance = Math.abs(
          element.getBoundingClientRect().top
        )
        const prevClosestElementToTopDistance =
          Math.abs(closestElement?.getBoundingClientRect().top || Infinity) + 70
        // 元素到頂端距離最小者 & 至少不能沉於可見視窗之下
        if (
          currentToTopDistance < prevClosestElementToTopDistance &&
          element.getBoundingClientRect().top < windowHeight.current
        ) {
          closestElement = element
        }
      })
      setActiveHeading(closestElement?.id)
    }, 100)

    handler()
    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [asPath])

  return activeHeading
}
