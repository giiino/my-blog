import * as React from 'react'

import styled from '@emotion/styled'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void
}

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  return (
    <Container position='sticky' color='inherit'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
        >
          <Link href={'/'} style={{ marginRight: '20px' }}>
            <Image
              src={'/logo.svg'}
              alt='logo'
              width={120}
              height={60}
              style={{ display: 'block' }}
            />
          </Link>
          <RouteButton href='/' style={{ marginRight: '20px' }}>
            首頁
          </RouteButton>
          <RouteButton href='/article' style={{ marginRight: '20px' }}>
            文章
          </RouteButton>
          <RouteButton href='/edit'>新增文章</RouteButton>
        </Typography>
        <DarkModeIcon />
      </Toolbar>
    </Container>
  )
}

const Container = styled(AppBar)`
  z-index: 5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`

const RouteButton = styled(Link)`
  font-size: 16px;
  color: #000;
  &:hover {
    color: var(--primary-blue-4);
  }
`
