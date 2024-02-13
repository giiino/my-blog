import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

import { Code } from './code'

export const components:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
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
