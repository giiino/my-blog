import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import styled from '@emotion/styled'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, IconButtonProps } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { useRouter } from 'next/router'

import { ConfirmDeleteModal } from './confirm-delete-modal'

interface SettingProps extends IconButtonProps {
  editId: string
}

export function Setting({ editId, ...props }: SettingProps) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const { push } = useRouter()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleMenuClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const navigateToEdit = (event: Event | SyntheticEvent) => {
    push(`/edit/${editId}`)
    handleMenuClose(event)
  }
  const handleDeleteMenuItemClick = (event: Event | SyntheticEvent) => {
    handleMenuClose(event)
    setIsDeleteModalOpen(true)
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    // 用於監測是否為從打開變為關閉
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        deleteId={editId}
        handleClose={handleDeleteModalClose}
      />
      <IconButton
        ref={anchorRef}
        id='setting-button'
        aria-controls={open ? 'setting-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleToggle}
        {...props}
      >
        <MoreIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList
                  autoFocusItem={open}
                  id='setting-menu'
                  aria-labelledby='setting-button'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={navigateToEdit}>編輯</MenuItem>
                  <MenuItem onClick={handleDeleteMenuItemClick}>刪除</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const MoreIcon = styled(MoreVertIcon)`
  color: var(--color-text);
`
