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

import { scrollBarStyle } from '@/styles/globals'

export function Menu(props: GridProps) {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <ListContainer {...props}>
      <List
        sx={{ bgcolor: 'background.paper' }}
        aria-labelledby='主題選擇菜單'
        component='nav'
      >
        <ListItemButton selected>
          <ListItemText primary='Sent mail' />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary='Drafts' />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary='Drafts' />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary='Inbox' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary='Starred' />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </ListContainer>
  )
}

const ListContainer = styled(Grid)`
  position: sticky;
  top: 100px;
  align-self: flex-start;
  font-size: 14px;
  overflow-y: auto;
  max-height: 80vh;
  padding-right: 10px;

  ${scrollBarStyle}

  .MuiButtonBase-root {
    color: var(--primary-gray-300);
    &:hover {
      background-color: transparent;
      color: var(--primary-gray-400);
    }
  }
  .Mui-selected {
    background-color: var(--primary-blue-1) !important;
    color: var(--primary-blue-4);
    border-radius: 5px;
    font-weight: bold;
    &:hover {
      color: var(--primary-blue-4);
    }
  }
  .MuiTypography-root {
    font-size: 15px;
  }
  @media screen and (max-width: 960px) {
    display: none;
  }
`
