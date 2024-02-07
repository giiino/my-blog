import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps
} from '@mui/material'
import { ObjectId } from 'typeorm'

import { useDeletePost } from '@/features/post/hooks/use-mutation'

interface ConfirmDeleteModalProps extends DialogProps {
  deleteId: ObjectId
  handleClose: () => void
}

export const ConfirmDeleteModal = ({
  open,
  deleteId,
  handleClose
}: ConfirmDeleteModalProps) => {
  const { mutateAsync: remove, isLoading } = useDeletePost()

  const handleConfirm = async () => {
    await remove(String(deleteId))
    handleClose()
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='delete-post-dialog-description'
        fullWidth
        maxWidth='xs'
      >
        <DialogContent>
          <DialogContentText
            id='delete-post-dialog-description'
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
            disabled={isLoading}
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
    </>
  )
}
