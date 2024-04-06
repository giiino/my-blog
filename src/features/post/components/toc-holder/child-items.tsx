import { Heading } from '@/shared/store/use-headings'

import { ListItem } from './list-item'

interface ChildItemsProps {
  heading: Heading[]
  activeHeadingId: string | undefined
}

export const ChildItems = ({ heading, activeHeadingId }: ChildItemsProps) => {
  return (
    <ul style={{ paddingLeft: '20px' }}>
      {heading.map((item) => (
        <ListItem
          key={item.id}
          title={item.title}
          id={item.id}
          isActive={item.id === activeHeadingId}
        />
      ))}
    </ul>
  )
}
