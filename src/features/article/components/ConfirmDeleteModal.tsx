import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps
} from '@mui/material'
import { ObjectId } from 'typeorm'

import { useDeleteArticle } from '@/features/editor/hooks/use-mutations'

interface ConfirmDeleteModalProps extends DialogProps {
  deleteId: ObjectId
  handleClose: () => void
}

export const ConfirmDeleteModal = ({
  open,
  deleteId,
  handleClose
}: ConfirmDeleteModalProps) => {
  const { mutateAsync: deleteIt } = useDeleteArticle()

  const handleConfirm = async () => {
    await deleteIt(String(deleteId))
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='delete-article-dialog-description'
    >
      <DialogContent>
        <DialogContentText
          id='delete-article-dialog-description'
          color='MenuText'
        >
          確定要刪除這篇文章嗎?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirm}
          color='error'
          variant='contained'
          disableRipple
          disableElevation
        >
          確定
        </Button>
        <Button
          onClick={handleClose}
          color='inherit'
          variant='outlined'
          disableRipple
          sx={{ borderColor: '#ccc' }}
        >
          取消
        </Button>
      </DialogActions>
    </Dialog>
  )
}
