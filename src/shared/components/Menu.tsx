import { useState } from 'react'

import styled from '@emotion/styled'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MenuCategoriesResponse } from '@/shared/types/api/article'

interface MenuProps {
  menuCategories: MenuCategoriesResponse[]
}

export function Menu({ menuCategories }: MenuProps) {
  const [currentCategory, setCurrentCategory] = useState('')

  const handleClick = (category: string) => {
    setCurrentCategory((prev) => {
      if (category === prev) {
        return ''
      }
      return category
    })
  }

  return (
    <ListContainer>
      <List
        sx={{ bgcolor: 'background.paper' }}
        aria-labelledby='主題選擇菜單'
        component='nav'
      >
        {menuCategories.map((menuCategory) => (
          <GroupListItem
            key={menuCategory.category}
            {...menuCategory}
            open={currentCategory === menuCategory.category}
            handleClick={handleClick}
          />
        ))}
      </List>
    </ListContainer>
  )
}

interface GroupListItemProps extends MenuCategoriesResponse {
  open: boolean
  handleClick: (category: string) => void
}

const GroupListItem = ({
  category,
  titles,
  open,
  handleClick
}: GroupListItemProps) => {
  const { query } = useRouter()
  const currentArticleId = query.id as string
  const isCategorySelected = titles.some(({ _id }) => _id === currentArticleId)

  return (
    <>
      <ListItemButton
        onClick={() => handleClick(category)}
        selected={isCategorySelected}
      >
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
    background-color: ${({ theme }) => theme.bgColor};
  }

  .MuiButtonBase-root {
    color: ${({ theme }) => theme.menu.color};
    &:hover {
      background-color: ${({ theme }) => theme.bgColor};
      color: ${({ theme }) => theme.menu.hoverColor};
    }
  }
  .Mui-selected {
    background-color: ${({ theme }) => theme.bgColor} !important;
    color: ${({ theme }) => theme.menu.selectedColor} !important;
    border-radius: 5px;
    /* &:hover {
      color: var(--primary-blue-4);
    } */
    .MuiTypography-root {
      font-weight: bold;
    }
  }
`
