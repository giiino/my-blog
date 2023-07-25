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

export default function Header() {
  return (
    <Container position='sticky' color='inherit'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          News
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
