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

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    width: 5px;
    height: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .MuiButtonBase-root {
    &:hover {
      background-color: transparent;
      color: var(--main-blue-gray);
    }
  }
  .Mui-selected {
    background-color: transparent;
    color: var(--main-blue);
    border-radius: 10px;
    font-weight: bold;
    &:hover {
      color: var(--main-blue);
    }
  }
  .MuiTypography-root {
    font-size: 15px;
  }
  @media screen and (max-width: 960px) {
    display: none;
  }
`
