import { CSSProperties, ComponentProps, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import styled from '@emotion/styled'

import { isVoid } from '../../utils/check'

interface EnhancedImageProps extends ComponentProps<typeof LazyLoadImage> {
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
        <LazyLoadImage src='/img-not-found.png' alt={'圖片找不到'} {...props} />
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
      <LazyLoadImage
        {...props}
        effect='blur'
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
  overflow: hidden;
  width: ${({ imageWidth }) => imageWidth};
  padding-bottom: ${({ ratio, imageWidth }) =>
    ratio ? `calc(${imageWidth} * ${ratio})` : 'initial'};
  .lazy-load-image-loaded {
    position: absolute;
    width: inherit !important;
    height: inherit !important;
    padding-bottom: inherit;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
`
