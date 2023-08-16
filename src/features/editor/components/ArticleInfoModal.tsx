import styled from '@emotion/styled'
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  InputBase,
  Stack,
  TextField
} from '@mui/material'

import { useCategories } from '../hooks/use-queries'
import { PreviewImageInput } from './PreviewImageInput'

interface ArticleInfoModalProps extends DialogProps {
  title: string
  category: string
  coverImage: string
  isReadme: boolean
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCategoryChange: (_: unknown, value: string | null) => void
  onCoverImageChange: (image: string) => void
  onIsReadmeCheckChange: () => void
  handleSubmit: () => void
  handleClose: () => void
}

export const ArticleInfoModal = ({
  open,
  title,
  category,
  coverImage,
  isReadme,
  onTitleChange,
  onCategoryChange,
  onCoverImageChange,
  onIsReadmeCheckChange,
  handleSubmit,
  handleClose
}: ArticleInfoModalProps) => {
  const { data: categories } = useCategories()
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='delete-article-dialog-description'
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle id='alert-dialog-title'>文章資訊編輯</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Autocomplete
              disablePortal
              disableClearable
              freeSolo
              value={category}
              options={categories || []}
              size='small'
              onInputChange={onCategoryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='分類'
                  variant='standard'
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              )}
            />
            <TextField
              label='文章標題'
              variant='standard'
              value={title}
              onChange={onTitleChange}
              size='small'
              InputLabelProps={{
                shrink: true
              }}
            />
            <PreviewImageInput
              imageUrl={coverImage}
              onImageUrlChange={onCoverImageChange}
            />
            <FormControlLabel
              sx={{ width: 'fit-content' }}
              control={
                <Checkbox
                  disableRipple
                  checked={isReadme}
                  onChange={onIsReadmeCheckChange}
                  sx={{ pl: 0 }}
                />
              }
              label='文章首頁'
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant='contained'
            disableRipple
            disableElevation
          >
            送出
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
