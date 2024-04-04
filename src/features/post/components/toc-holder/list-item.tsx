import Link from 'next/link'

interface ListItemProps {
  id: string
  title: string
}

export const ListItem = ({ id, title }: ListItemProps) => {
  return (
    <li>
      <Link href={`#${id}`}>{title}</Link>
    </li>
  )
}
