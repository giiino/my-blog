import React from 'react'

import styled from '@emotion/styled'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  Link,
  Stack
} from '@mui/material'

import { AdminOnly } from '@/shared/components/AdminOnly'
import { Menu } from '@/shared/components/Menu'
import { useMenuCategory } from '@/shared/hooks/use-queries'
import { useRouteChange } from '@/shared/hooks/useRouteChange'
import { scrollBarStyle } from '@/styles/globals'

interface SiderbarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Siderbar = ({ isOpen, setIsOpen }: SiderbarProps) => {
  const { data: categories, isLoading, isError, refetch } = useMenuCategory()

  useRouteChange({
    callback: () => setIsOpen(false)
  })

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
          <AdminOnly>
            <RouteButton href='/edit'>新增文章</RouteButton>
          </AdminOnly>
        </RouteWrapper>
        <Divider sx={{ margin: '20px 16px' }} />
        <MenuWrapper>
          {isLoading ? (
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              sx={{
                height: '100%'
              }}
            >
              <CircularProgress style={{ color: 'var(--primary-gray-200)' }} />
            </Stack>
          ) : isError ? (
            <Stack
              rowGap={3}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{
                height: '100%'
              }}
            >
              <WarningIcon fontSize='large' color='error' />
              <p style={{ color: 'var(--primary-gray-200)' }}>
                資料獲取過程發生錯誤
              </p>
              <Button variant='outlined' size='small' onClick={() => refetch()}>
                重試
              </Button>
            </Stack>
          ) : (
            <Menu menuCategories={categories || []} />
          )}
        </MenuWrapper>
      </Container>
    </Drawer>
  )
}

export default Siderbar

const Container = styled(Stack)`
  padding: 50px 25px;
`

const RouteWrapper = styled(Stack)`
  align-items: center;
  height: 5vh;
  padding: 0 16px;
`

const RouteButton = styled(Link)`
  font-size: 16px;
  color: #000;
  line-height: 16px;
  text-decoration: none;
  &:hover {
    color: var(--primary-blue-4);
  }
`

const MenuWrapper = styled(Box)`
  width: 70vw;
  height: 70vh;
  overflow: auto;
  ${scrollBarStyle}
`
