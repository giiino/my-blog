import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'
// https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
// style: coy oneDark
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
      <SyntaxHighlighter
        language={match?.[1]}
        showLineNumbers={true}
        style={coldarkDark as any}
        customStyle={{ borderRadius: 0 }}
        PreTag='div'
        className='syntax-hight-wrapper'
        {...props}
      >
        {replaceLast(children as string[])}
      </SyntaxHighlighter>
    )
  },
  a: (props) => <a {...props} target='_blank' />
}

const replaceLast = (target: string[]) => {
  return target.map((item, index) => {
    if (index === 0) {
      return item.replace('\n', '')
    }
    return item
  })
}
