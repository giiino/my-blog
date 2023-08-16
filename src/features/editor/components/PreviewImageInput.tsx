import { useState } from 'react'

import styled from '@emotion/styled'
import { Stack, TextField } from '@mui/material'
import Image from 'next/image'

import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import { isVoid } from '@/shared/utils/check'

interface PreviewImageInputProps {
  imageUrl: string
  onImageUrlChange: (image: string) => void
}

export const PreviewImageInput = ({
  imageUrl,
  onImageUrlChange
}: PreviewImageInputProps) => {
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageUrlChange(e.target.value)
  }

  return (
    <Stack>
      <TextField
        label='圖片連結'
        variant='standard'
        value={imageUrl}
        onChange={handleUrlChange}
        size='small'
        InputLabelProps={{
          shrink: true
        }}
      />
      {!isVoid(imageUrl) && (
        <ErrorBoundary fallback={ImageErrorFallback}>
          <PreviewImage
            src={imageUrl}
            alt='文章編輯預覽圖'
            width='300'
            height='300'
          />
        </ErrorBoundary>
      )}
    </Stack>
  )
}

const PreviewImage = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #ccc;
  margin-top: 20px;
`

export const ImageErrorFallback = ({ error }: { error: Error | null }) => <></>
