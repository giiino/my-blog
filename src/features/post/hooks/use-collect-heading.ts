import { useEffect, useRef } from 'react'

import { useRouter } from 'next/router'

import { HeadingsData, useHeadings } from '@/shared/store/use-headings'

export const useCollectHeading = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const { asPath } = useRouter()
  const { setHeadings } = useHeadings()

  useEffect(() => {
    if (!contentRef.current) return

    const headings = Array.from(
      contentRef.current.querySelectorAll('h3, h4')
    ) as HTMLElement[]

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

  return contentRef
}
