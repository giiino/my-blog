import { Heading } from '@/shared/store/use-headings'

import { ListItem } from './list-item'

interface ChildItemsProps {
  heading: Heading[]
}

export const ChildItems = ({ heading }: ChildItemsProps) => {
  return (
    <ul style={{ paddingLeft: '20px' }}>
      {heading.map((item) => (
        <ListItem key={item.id} id={item.id} title={item.title} />
      ))}
    </ul>
  )
}
