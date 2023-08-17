import React, { useState } from 'react'

import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'

import { isVoid } from '../utils/check'

interface ErrorHandledImageProps extends ImageProps {
  alt: string
  ratio: number
}

export const ErrorHandledImage = ({
  alt,
  ratio,
  ...props
}: ErrorHandledImageProps) => {
  const [isError, setIsError] = useState(false)
  const imageUrl = props.src

  if (isError || isVoid(imageUrl)) {
    return null
  }

  return (
    <ImageContainer ratio={ratio}>
      <Image {...props} alt={alt} onError={() => setIsError(true)} />
    </ImageContainer>
  )
}

const ImageContainer = styled.div<{
  ratio: number
}>`
  position: relative;
  width: 100%;
  padding-bottom: ${({ ratio }) => `calc(100% * ${ratio})`};
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
