import { toast } from 'react-hot-toast'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, BoxProps, Button } from '@mui/material'

import { useUploadImage } from '../../hooks/use-mutations'
import { ValueKeys, useFormikContext } from '../edit-formik'

interface FilesButtonProps extends BoxProps {}

export function UploadImageButton(props: FilesButtonProps) {
  const { setFieldValue } = useFormikContext()
  const { mutateAsync: upload } = useUploadImage()

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length !== 1) {
      toast.error('限制上傳一張圖片')
      return
    }

    if (!e.target.files[0].type.startsWith('image/')) {
      toast.error('限制上傳圖片')
      return
    }

    const preview = URL.createObjectURL(e.target.files[0])

    setFieldValue(ValueKeys['封面'], preview)
    const imageFile = e.target.files[0]

    const url = await upload(imageFile)

    setFieldValue(ValueKeys['封面'], url)
  }

  return (
    <Box {...props}>
      <label htmlFor='upload-input'>
        <input
          id='upload-input'
          type='file'
          onChange={onSelectFile}
          accept='image/*'
          style={{ display: 'none' }}
        />
        <Button
          component='span'
          variant='contained'
          startIcon={<CloudUploadIcon />}
        >
          上傳
        </Button>
      </label>
    </Box>
  )
}
