import React, { useState } from 'react'

import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'

import { isVoid } from '../utils/check'

interface HandledImageProps extends ImageProps {
  alt: string
  realWidth: string
  ratio: number
}

export const HandledImage = ({
  alt,
  realWidth,
  ratio,
  ...props
}: HandledImageProps) => {
  const [isError, setIsError] = useState(false)
  const imageUrl = props.src

  if (isError || isVoid(imageUrl)) {
    return (
      <ImageContainer ratio={ratio} realWidth={realWidth}>
        <Image {...props} src='/image-not-found.png' alt={'圖片找不到'} />
      </ImageContainer>
    )
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
