import styled from '@emotion/styled'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
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
              src={'/logo.svg'}
              alt='logo'
              width={120}
              height={20}
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
          <RouteButton className='route-btn' href='/edit'>
            新增文章
          </RouteButton>
        </Typography>
        <DarkModeIcon />
      </Toolbar>
    </Container>
  )
}

const Container = styled(AppBar)`
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
    @media screen and (max-width: 960px) {
      display: none;
    }
  }
`

const RouteButton = styled(Link)`
  font-size: 16px;
  color: #000;
  &:hover {
    color: var(--primary-blue-4);
  }
`
