import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

import { isVoid } from '@/shared/utils/check'
import { getCustomSyntax } from '@/shared/utils/markdown'

import { EnhancedImage } from '../lib/enhanced-image'
import { Li } from './Li'
import { Code } from './code'

export const components:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
  p: ({ children }) => <div className='paragraph'>{children}</div>,
  img: ({ src, alt }) => {
    if (!src || !alt) return null
    const [originalImage, compressedImage] = src.split(',')
    const searchParams = new URL(originalImage).searchParams
    const width = Number(searchParams.get('width'))
    const height = Number(searchParams.get('height'))
    if (isNaN(width) || isNaN(height)) return null

    const figcaptionValue = getCustomSyntax(alt, '!')
    return (
      <figure>
        <EnhancedImage
          src={originalImage}
          compressedImageLoader={compressedImage}
          flexibleSize={{
            imageWidth: '100%',
            ratio: height / width,
            maxHeight: '350px'
          }}
          alt={figcaptionValue || alt}
          width={500}
          height={500}
        />
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
