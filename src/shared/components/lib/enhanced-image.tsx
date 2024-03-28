import { CSSProperties, ComponentProps, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'

import { isVoid } from '../../utils/check'

interface EnhancedImageProps extends ImageProps {
  alt: string
  imageWidth: string
  ratio: number
  containerStyle?: CSSProperties
}

export const EnhancedImage = ({
  alt,
  ratio,
  imageWidth,
  containerStyle,
  ...props
}: EnhancedImageProps) => {
  const [isError, setIsError] = useState(false)
  const imageUrl = props.src

  if (isError || isVoid(imageUrl)) {
    return (
      <ImageContainer
        className='enhanced-img'
        ratio={ratio}
        imageWidth={imageWidth}
        style={containerStyle}
      >
        <Image {...props} src='/img-not-found.png' alt={'圖片找不到'} />
      </ImageContainer>
    )
  }

  return (
    <ImageContainer
      className='enhanced-img'
      ratio={ratio}
      imageWidth={imageWidth}
      style={containerStyle}
    >
      <Image
        {...props}
        blurDataURL={props.src as string}
        width='800'
        height='800'
        placeholder='blur'
        alt={alt}
        onError={() => setIsError(true)}
      />
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
    ratio ? `calc(${imageWidth} * ${ratio})` : 'initial'};
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
