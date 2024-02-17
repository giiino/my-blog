import { Fragment, PropsWithChildren, useState } from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'

import { isVoid } from '../../utils/check'

interface EnhancedImageProps extends ImageProps {
  alt: string
  compressedImageLoader?: string
  flexibleSize?: { imageWidth: string; ratio: number }
}

export const EnhancedImage = ({
  alt,
  compressedImageLoader,
  flexibleSize,
  ...props
}: EnhancedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const imageUrl = props.src

  if (isError || isVoid(imageUrl)) {
    return (
      <Wrapper flexibleSize={flexibleSize}>
        <Image {...props} src='/img-not-found.png' alt={'圖片找不到'} />
      </Wrapper>
    )
  }

  return (
    <Wrapper flexibleSize={flexibleSize}>
      <>
        {!isLoaded && compressedImageLoader && (
          <Image
            {...props}
            width={10}
            height={10}
            src={compressedImageLoader!}
            alt={alt}
            style={{ zIndex: 1 }}
          />
        )}
        <Image
          {...props}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      </>
    </Wrapper>
  )
}

interface WrapperProps {
  flexibleSize: { imageWidth: string; ratio: number } | undefined
}

const Wrapper = ({
  flexibleSize,
  children
}: PropsWithChildren<WrapperProps>) => {
  if (flexibleSize) {
    return (
      <ImageContainer
        ratio={flexibleSize.ratio}
        imageWidth={flexibleSize.imageWidth}
      >
        {children}
      </ImageContainer>
    )
  }

  return <Fragment>{children}</Fragment>
}

const ImageContainer = styled.span<{
  ratio: number | undefined
  imageWidth: string
}>`
  display: inline-block;
  position: relative;
  width: ${({ imageWidth }) => imageWidth};
  padding-bottom: ${({ ratio, imageWidth }) =>
    ratio ? `min(calc(${imageWidth} * ${ratio}), 350px)` : 'initial'};
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
