import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

import { css } from '@emotion/react'

import { EnhancedImage } from '../lib/enhanced-image'
import { Code } from './code'

export const components:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
  img: ({ src, alt }) => {
    if (!src || !alt) return null
    const [originalImage, compressedImage] = src.split(',')
    return (
      <EnhancedImage
        src={originalImage}
        compressedImageLoader={compressedImage}
        alt={alt}
        css={css`
          width: 100%;
          height: auto;
          object-fit: contain;
        `}
        width={500}
        height={500}
      />
    )
  },
  li: ({ ordered, children, index, ...props }) => {
    if (ordered) {
      return (
        <li className='count' {...props}>
          <span className='serial-number'>{index + 1}.</span>
          {children}
        </li>
      )
    }
    return (
      <li className='no-count' {...props}>
        {children}
      </li>
    )
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
