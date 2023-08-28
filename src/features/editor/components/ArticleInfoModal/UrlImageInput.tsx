import styled from '@emotion/styled'
import { Autocomplete, Box, Stack, StackProps, TextField } from '@mui/material'
import Image from 'next/image'

import { useConverImages } from '../../hooks/use-queries'

interface UrlImageInputProps extends StackProps {
  imageUrl: string
  onImageUrlChange: (image: string) => void
}

export const UrlImageInput = ({
  imageUrl,
  onImageUrlChange,
  ...restProps
}: UrlImageInputProps) => {
  const { data: converImagesList } = useConverImages()

  const handleUrlChange = (_: unknown, value: string) => {
    onImageUrlChange(value)
  }

  return (
    <Stack {...restProps}>
      <Autocomplete
        disablePortal
        disableClearable
        freeSolo
        value={imageUrl}
        options={converImagesList || []}
        size='small'
        onInputChange={handleUrlChange}
        ListboxProps={{ style: { maxHeight: '200px' } }}
        renderOption={(props, option) => (
          <Box component='li' {...props}>
            <OptionImage width='50' height='50' src={option} alt='封面圖' />
            <span style={{ wordBreak: 'break-word' }}>{option}</span>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label='封面圖(外部連結)'
            variant='standard'
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
    </Stack>
  )
}

const OptionImage = styled(Image)`
  object-fit: contain;
  border: 1px solid #ccc;
  background: #fff;
  margin-right: 20px;
`
