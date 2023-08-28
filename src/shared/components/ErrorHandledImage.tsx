import React, { useState } from 'react'

import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'

import { isVoid } from '../utils/check'

interface ErrorHandledImageProps extends ImageProps {
  alt: string
  realWidth: string
  ratio: number
}

export const ErrorHandledImage = ({
  alt,
  realWidth,
  ratio,
  ...props
}: ErrorHandledImageProps) => {
  const [isError, setIsError] = useState(false)
  const imageUrl = props.src

  if (isError || isVoid(imageUrl)) {
    return <Image {...props} src='/image-not-found.jpg' alt={'圖片找不到'} />
  }

  return (
    <ImageContainer ratio={ratio} realWidth={realWidth}>
      <Image {...props} alt={alt} onError={() => setIsError(true)} />
    </ImageContainer>
  )
}

const ImageContainer = styled.div<{
  ratio: number
  realWidth: string
}>`
  position: relative;
  width: ${({ realWidth }) => realWidth};
  padding-bottom: ${({ ratio, realWidth }) => `calc(${realWidth} * ${ratio})`};
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
