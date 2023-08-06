import * as React from 'react'

import styled from '@emotion/styled'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Grid, GridProps } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MenuCategoriesResponse } from '@/pages/api/article'

interface MenuProps {
  menuCategories: MenuCategoriesResponse[]
}

export function Menu({ menuCategories }: MenuProps) {
  return (
    <ListContainer>
      <List
        sx={{ bgcolor: 'background.paper' }}
        aria-labelledby='主題選擇菜單'
        component='nav'
      >
        {menuCategories.map((menuCategory) => (
          <GroupListItem key={menuCategory.category} {...menuCategory} />
        ))}
      </List>
    </ListContainer>
  )
}

const GroupListItem = ({ category, titles }: MenuCategoriesResponse) => {
  const [open, setOpen] = React.useState(false)
  const { query } = useRouter()
  const currentArticleId = query.id as string
  const isCategorySelected = titles.some(({ _id }) => _id === currentArticleId)

  const handleClick = () => setOpen(!open)

  return (
    <>
      <ListItemButton onClick={handleClick} selected={isCategorySelected}>
        <ListItemText primary={category} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        {titles.map(({ title, _id }) => {
          const isSelected = _id === currentArticleId
          return (
            <List key={_id} component='div' disablePadding>
              <Link href={`/article/${_id}`}>
                <ListItemButton selected={isSelected} sx={{ pl: 4 }}>
                  <ListItemText primary={title} />
                </ListItemButton>
              </Link>
            </List>
          )
        })}
      </Collapse>
    </>
  )
}

const ListContainer = styled.div`
  .MuiList-root {
    padding: 0;
  }

  .MuiButtonBase-root {
    color: var(--primary-gray-300);
    &:hover {
      background-color: transparent;
      color: var(--primary-gray-400);
    }
  }
  .Mui-selected {
    background-color: transparent !important;
    color: var(--primary-blue-4);
    border-radius: 5px;
    &:hover {
      color: var(--primary-blue-4);
    }
    .MuiTypography-root {
      font-weight: bold;
    }
  }
`
