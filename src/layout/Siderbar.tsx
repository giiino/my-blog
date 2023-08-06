import React from 'react'

import styled from '@emotion/styled'
import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Stack
} from '@mui/material'

import { Menu } from '@/shared/components/Menu'
import { useMenuCategory } from '@/shared/hooks/use-queries'
import { scrollBarStyle } from '@/styles/globals'

interface SiderbarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Siderbar = ({ isOpen, setIsOpen }: SiderbarProps) => {
  const { data: categories } = useMenuCategory()

  const toggleDrawer =
    (_: unknown, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsOpen(open)
    }

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={toggleDrawer(undefined, false)}
    >
      <Container>
        <RouteWrapper direction={'row'}>
          <RouteButton href='/' style={{ marginRight: '20px' }}>
            首頁
          </RouteButton>
          <RouteButton href='/article' style={{ marginRight: '20px' }}>
            文章
          </RouteButton>
          <RouteButton href='/edit'>新增文章</RouteButton>
        </RouteWrapper>
        <Divider sx={{ margin: '20px 0' }} />
        <MenuWrapper>
          <Menu menuCategories={categories || []} />
        </MenuWrapper>
      </Container>
    </Drawer>
  )
}

export default Siderbar

const Container = styled(Stack)`
  padding: 50px;
`

const RouteWrapper = styled(Stack)`
  align-items: center;
  height: 5vh;
  /* margin: 10px 50px; */
`

const RouteButton = styled(Link)`
  font-size: 16px;
  color: #000;
  line-height: 16px;
  &:hover {
    color: var(--primary-blue-4);
  }
`

const MenuWrapper = styled(Box)`
  width: 70vw;
  height: 70vh;
  /* margin: 10px 50px 50px 50px; */
  overflow: auto;
  ${scrollBarStyle}
`
