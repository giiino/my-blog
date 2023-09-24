import { toast } from 'react-hot-toast'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, BoxProps, Button } from '@mui/material'

import { useUploadImage } from '../../hooks/use-mutations'

interface FilesButtonProps extends BoxProps {
  imageUrl: string
  onImageUrlChange: (image: string) => void
}

export function UploadImageButton({
  imageUrl,
  onImageUrlChange,
  ...restProps
}: FilesButtonProps) {
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

    onImageUrlChange(preview)

    const formData = new FormData()
    formData.append('image', e.target.files[0])
    const {
      data: {
        data: { url }
      }
    } = await upload(formData)

    onImageUrlChange(url)
  }

  return (
    <Box {...restProps}>
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
