import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

import dynamic from 'next/dynamic'

import { Image } from './image'
import { Li } from './li'
import { LinkTitle } from './link-title'

const Code = dynamic(() => import('./code').then(({ Code }) => Code), {
  ssr: false
})

export const components:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
  p: ({ children }) => <div className='paragraph'>{children}</div>,
  h3: ({ children }) => <LinkTitle role='h3'>{children}</LinkTitle>,
  h4: ({ children }) => <LinkTitle role='h4'>{children}</LinkTitle>,
  img: ({ src, alt }) => <Image src={src} alt={alt} />,
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
