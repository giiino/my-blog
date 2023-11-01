import { useState } from 'react'

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
  Stack,
  Switch,
  TextField
} from '@mui/material'

import { ErrorBoundary } from '@/shared/components/lib/ErrorBoundary'
import { HandledImage } from '@/shared/components/lib/HandledImage'
import { isVoid } from '@/shared/utils/check'

import { useCategories } from '../../hooks/use-queries'
import { UploadImageButton } from './UploadImageButton'
import { UrlImageInput } from './UrlImageInput'

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
  const [isUrlCoverImage, setIsUrlCoverImage] = useState(true)
  const { data: categories } = useCategories()

  const handleCoverImgCheckChange = () =>
    setIsUrlCoverImage((checked) => !checked)

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
              ListboxProps={{ style: { maxHeight: '200px' } }}
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
            <Stack direction='row'>
              {isUrlCoverImage ? (
                <UrlImageInput
                  imageUrl={coverImage}
                  onImageUrlChange={onCoverImageChange}
                  sx={{ flex: 1 }}
                />
              ) : (
                <UploadImageButton
                  imageUrl={coverImage}
                  onImageUrlChange={onCoverImageChange}
                  sx={{ flex: 1 }}
                />
              )}
              <FormControlLabel
                sx={{ mr: 0 }}
                control={
                  <Switch
                    checked={isUrlCoverImage}
                    onChange={handleCoverImgCheckChange}
                  />
                }
                label='外部連結'
              />
            </Stack>
            {!isVoid(coverImage) && (
              <ErrorBoundary fallback={ImageErrorFallback} key={coverImage}>
                <PreviewImage
                  src={coverImage}
                  alt='文章編輯預覽圖'
                  width='100'
                  height='100'
                  realWidth={'100px'}
                  ratio={1}
                />
              </ErrorBoundary>
            )}
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

const PreviewImage = styled(HandledImage)`
  object-fit: contain;
  border: 1px solid #ccc;
`

const ImageErrorFallback = ({ error }: { error: Error | null }) => (
  <PreviewImage
    src={'/img-not-found.png'}
    alt='圖片顯示錯誤'
    width='100'
    height='100'
    realWidth={'100px'}
    ratio={1}
  />
)
