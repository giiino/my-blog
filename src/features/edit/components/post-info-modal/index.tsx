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

import { EnhancedImage } from '@/shared/components/lib/enhanced-image'
import { ErrorBoundary } from '@/shared/components/lib/error-boundary'
import toast from '@/shared/lib/toast'
import { isVoid } from '@/shared/utils/check'

import { useCategories } from '../../hooks/use-categories'
import { ValueKeys, useFormikContext } from '../edit-formik'
import { UploadImageButton } from './upload-image-button'
import { UrlImageInput } from './url-image-input'

interface PostInfoModalProps extends DialogProps {
  isForUpdate?: boolean
  handleClose: () => void
}

export const PostInfoModal = ({
  open,
  isForUpdate,
  handleClose
}: PostInfoModalProps) => {
  const { values, errors, handleChange, submitForm, setFieldValue } =
    useFormikContext()
  const [isUrlCoverImage, setIsUrlCoverImage] = useState(true)
  const categories = useCategories()

  const handleCoverImgCheckChange = () => {
    setIsUrlCoverImage((checked) => !checked)
  }

  const handleSubmit = () => {
    const error = Object.values(errors)[0]
    if (error) toast.warn(error)
    submitForm()
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
        <DialogTitle id='alert-dialog-title'>文章資訊編輯</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Autocomplete
              disablePortal
              disableClearable
              freeSolo
              options={categories || []}
              value={values.category}
              onInputChange={(_, value) =>
                setFieldValue(ValueKeys['種類'], value)
              }
              size='small'
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
              label='Id'
              variant='standard'
              value={values.id}
              name={ValueKeys['標示ID']}
              id={ValueKeys['標示ID']}
              onChange={handleChange}
              size='small'
              disabled={isForUpdate}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label='文章標題'
              variant='standard'
              value={values.title}
              name={ValueKeys['標題']}
              id={ValueKeys['標題']}
              onChange={handleChange}
              size='small'
              InputLabelProps={{
                shrink: true
              }}
            />
            <Stack direction='row'>
              {isUrlCoverImage ? (
                <UrlImageInput sx={{ flex: 1 }} />
              ) : (
                <UploadImageButton sx={{ flex: 1 }} />
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
            {!isVoid(values.coverImage) && (
              <ErrorBoundary
                fallback={ImageErrorFallback}
                key={values.coverImage}
              >
                <PreviewImage
                  src={values.coverImage}
                  alt='文章編輯預覽圖'
                  imageWidth='100px'
                  ratio={1}
                  style={{ objectFit: 'contain' }}
                />
              </ErrorBoundary>
            )}
            {/* <FormControlLabel
              sx={{ width: 'fit-content' }}
              control={
                <Checkbox
                  disableRipple
                  checked={isReadme}
                  onChange={onIsReadmeCheckChange}
                  sx={{ pl: 0 }}
                />
              }
              label='草稿'
            /> */}
            <FormControlLabel
              sx={{ width: 'fit-content' }}
              control={
                <Checkbox
                  disableRipple
                  name={ValueKeys['isReadme']}
                  id={ValueKeys['isReadme']}
                  onChange={handleChange}
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

const PreviewImage = styled(EnhancedImage)`
  object-fit: contain;
  border: 1px solid #ccc;
`

const ImageErrorFallback = ({ error }: { error: Error | null }) => (
  <PreviewImage
    src={'/img-not-found.png'}
    alt='圖片顯示錯誤'
    imageWidth='100px'
    ratio={1}
    style={{ objectFit: 'contain' }}
  />
)
