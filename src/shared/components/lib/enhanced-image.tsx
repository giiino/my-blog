import { useState } from 'react'

import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'

import { isVoid } from '../../utils/check'

interface EnhancedImageProps extends ImageProps {
  alt: string
  imageWidth: string
  ratio: number
}

export const EnhancedImage = ({
  alt,
  imageWidth,
  ratio,
  ...props
}: EnhancedImageProps) => {
  const [isError, setIsError] = useState(false)
  const imageUrl = props.src

  if (isError || isVoid(imageUrl)) {
    return (
      <ImageContainer ratio={ratio} imageWidth={imageWidth}>
        <Image {...props} src='/img-not-found.png' alt={'圖片找不到'} />
      </ImageContainer>
    )
  }

  return (
    <ImageContainer ratio={ratio} imageWidth={imageWidth}>
      <Image {...props} alt={alt} onError={() => setIsError(true)} />
    </ImageContainer>
  )
}

const ImageContainer = styled.div<{
  ratio: number
  imageWidth: string
}>`
  position: relative;
  width: ${({ imageWidth }) => imageWidth};
  padding-bottom: ${({ ratio, imageWidth }) =>
    `calc(${imageWidth} * ${ratio})`};
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
