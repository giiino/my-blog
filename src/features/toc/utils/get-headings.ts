type Heading = Record<'title' | 'id', string>

interface HeadingsData extends Heading {
  items: Heading[]
}

export const getHeadings = () => {
  const headings = Array.from(
    document.querySelectorAll('h3, h4')
  ) as HTMLElement[]

  const result: HeadingsData[] = []
  headings.forEach((heading, idx) => {
    const { innerText: title, id, nodeName } = heading

    if (nodeName === 'H3') {
      result.push({ id, title, items: [] })
    } else if (nodeName === 'H4' && result.length > 0) {
      result[result.length - 1].items.push({ title, id })
    }
  })

  return result
}
