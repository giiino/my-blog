import styled from '@emotion/styled'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'

import { AdminOnly } from '@/shared/components/AdminOnly'
import { LOCALSOTRAGE_THEME_KEY } from '@/shared/constants/ui'
import useLocalStorage from '@/shared/hooks/useLocalStorage'
import type { ThemeMode } from '@/shared/types/ui'

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void
}

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  const [mode, setMode] = useLocalStorage<ThemeMode>(
    LOCALSOTRAGE_THEME_KEY,
    'light'
  )

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light')

  return (
    <Container position='sticky' color='inherit'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 1 }}
          onClick={() => setIsSidebarOpen(true)}
          className='sidebar-opener'
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
              src={'/logo-dark-mode.svg'}
              alt='logo'
              width={100}
              height={40}
              style={{ display: 'block' }}
            />
          </Link>
          <RouteButton
            className='route-btn'
            href='/'
            style={{ marginRight: '20px' }}
          >
            首頁
          </RouteButton>
          <RouteButton
            className='route-btn'
            href='/article'
            style={{ marginRight: '20px' }}
          >
            文章
          </RouteButton>
          <AdminOnly>
            <RouteButton
              className='route-btn'
              href='/edit'
              style={{ marginRight: '20px' }}
            >
              新增文章
            </RouteButton>
            <RouteButton className='route-btn' href='/tools'>
              工具
            </RouteButton>
          </AdminOnly>
        </Typography>
        <DarkModeIcon sx={{ cursor: 'pointer' }} onClick={toggleMode} />
      </Toolbar>
    </Container>
  )
}

const Container = styled(AppBar)`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  user-select: none;
  z-index: 5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  .sidebar-opener {
    display: none;
    @media screen and (max-width: 960px) {
      display: flex;
    }
  }

  .route-btn {
    display: flex;
    color: ${({ theme }) => theme.color};
    @media screen and (max-width: 960px) {
      display: none;
    }
  }
`

const RouteButton = styled(Link)`
  font-size: 16px;
  &:hover {
    color: ${({ theme }) => theme.header.tabHoverColor};
  }
`
