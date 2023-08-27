import { useState } from 'react'

import styled from '@emotion/styled'
import { Autocomplete, Box, Stack, TextField } from '@mui/material'
import Image from 'next/image'

import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import { isVoid } from '@/shared/utils/check'

import { useConverImages } from '../hooks/use-queries'

interface PreviewImageInputProps {
  imageUrl: string
  onImageUrlChange: (image: string) => void
}

export const PreviewImageInput = ({
  imageUrl,
  onImageUrlChange
}: PreviewImageInputProps) => {
  const { data: converImagesList } = useConverImages()

  const handleUrlChange = (_: unknown, value: string) => {
    onImageUrlChange(value)
  }

  return (
    <Stack>
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
            {option}
          </Box>
        )}
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
      {!isVoid(imageUrl) && (
        <ErrorBoundary fallback={ImageErrorFallback}>
          <PreviewImage
            src={imageUrl}
            alt='文章編輯預覽圖'
            width='100'
            height='100'
          />
        </ErrorBoundary>
      )}
    </Stack>
  )
}

const OptionImage = styled(Image)`
  object-fit: contain;
  border: 1px solid #ccc;
  background: #fff;
  margin-right: 20px;
`

const PreviewImage = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #ccc;
  margin-top: 20px;
`

export const ImageErrorFallback = ({ error }: { error: Error | null }) => <></>
