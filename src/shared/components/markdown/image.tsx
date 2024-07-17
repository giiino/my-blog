import styled from '@emotion/styled'

import { isVoid } from '@/shared/utils/check'
import { getCustomSyntax } from '@/shared/utils/markdown'

import { EnhancedImage } from '../lib/enhanced-image'

type Props = Record<'alt' | 'src', string | undefined>

export const Image = ({ alt, src }: Props) => {
  if (!src || !alt) return null
  const searchParams = new URL(src).searchParams
  const width = Number(searchParams.get('width'))
  const height = Number(searchParams.get('height'))
  if (isNaN(width) || isNaN(height)) return null

  const figcaptionValue = getCustomSyntax(alt, '!')
  const ratio = height / width

  const imageUrl = src.split('?')[0]

  return (
    <figure>
      <ImageWrapper isover={ratio > 1 ? '1' : '0'}>
        <EnhancedImage
          src={imageUrl}
          width={800}
          height={400}
          imageWidth='100%'
          ratio={ratio}
          alt={figcaptionValue || alt}
        />
      </ImageWrapper>
      {!isVoid(figcaptionValue?.trim()) && (
        <figcaption>{figcaptionValue}</figcaption>
      )}
    </figure>
  )
}
const ImageWrapper = styled.span<{ isover: string }>`
  .enhanced-img {
    padding-bottom: ${({ isover }) => isover === '1' && 'initial'};
    height: ${({ isover }) => isover === '1' && '400px'};
    img {
      object-fit: ${({ isover }) => isover === '1' && 'contain'};
    }
  }
`
