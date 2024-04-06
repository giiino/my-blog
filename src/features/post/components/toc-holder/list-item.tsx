import Link from 'next/link'

interface ListItemProps {
  id: string
  title: string
  isActive: boolean
}

export const ListItem = ({ title, id, isActive }: ListItemProps) => {
  return (
    <li>
      <Link
        href={`#${id}`}
        style={{
          color: isActive ? 'var(--primary-orange)' : undefined
        }}
      >
        {title}
      </Link>
    </li>
  )
}
