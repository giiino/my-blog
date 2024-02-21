import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

import { EnhancedImage } from '../lib/enhanced-image'
import { Code } from './code'

export const components:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
  img: ({ src, alt }) => {
    if (!src || !alt) return null
    const [originalImage, compressedImage] = src.split(',')
    const searchParams = new URL(originalImage).searchParams
    const width = +searchParams.get('width')!
    const height = +searchParams.get('height')!
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
          alt={alt}
          width={500}
          height={500}
        />
        <figcaption>{alt}</figcaption>
      </figure>
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
