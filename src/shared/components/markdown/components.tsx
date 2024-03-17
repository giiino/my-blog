import { PropsWithChildren } from 'react'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

import styled from '@emotion/styled'
import dynamic from 'next/dynamic'

import { isVoid } from '@/shared/utils/check'
import { getCustomSyntax } from '@/shared/utils/markdown'

import { EnhancedImage } from '../lib/enhanced-image'

const Code = dynamic(() => import('./code').then(({ Code }) => Code), {
  ssr: false
})

export const components:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
  p: ({ children }) => <div className='paragraph'>{children}</div>,
  img: ({ src, alt }) => {
    if (!src || !alt) return null
    const searchParams = new URL(src).searchParams
    const width = Number(searchParams.get('width'))
    const height = Number(searchParams.get('height'))
    if (isNaN(width) || isNaN(height)) return null

    const figcaptionValue = getCustomSyntax(alt, '!')
    const ratio = height / width

    return (
      <figure>
        <ImageWrapper isover={ratio > 1 ? '1' : '0'}>
          <EnhancedImage
            src={src}
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
  },
  li: ({ ordered, children, index }) => {
    if (ordered) {
      return <Li serialNumber={index}>{children}</Li>
    }
    return <Li>{children}</Li>
  },
  code: ({ children = [], className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    return (
      <Code language={match?.[1]} {...props}>
        {children as string[]}
      </Code>
    )
  },
  a: (props) => <a {...props} target='_blank' />
}

type LiProps = PropsWithChildren<{
  serialNumber?: number
}>

export const Li = ({ children, serialNumber }: LiProps) => {
  if (serialNumber) {
    return <Container serialnumber={serialNumber}>{children}</Container>
  }
  return <Container>{children}</Container>
}

const Container = styled.li<{
  serialnumber?: number
}>`
  position: relative;
  padding-left: 30px;
  &::before {
    position: absolute;
    left: ${({ serialnumber }) => (serialnumber ? '5px' : 0)};
    font-weight: ${({ serialnumber }) => (serialnumber ? 'initial' : 'bold')};
    color: ${({ serialnumber }) =>
      serialnumber ? 'initial' : 'var(--primary-blue-4)'};
    content: '${({ serialnumber }) =>
      serialnumber ? `${serialnumber}` : '•'}';
  }
`

const ImageWrapper = styled.span<{ isover: string }>`
  .enhanced-img {
    padding-bottom: ${({ isover }) => isover === '1' && 'initial'};
    height: ${({ isover }) => isover === '1' && '400px'};
    img {
      object-fit: ${({ isover }) => isover === '1' && 'contain'};
    }
  }
`
