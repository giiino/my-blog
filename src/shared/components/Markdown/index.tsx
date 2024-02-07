import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm'

import { StyleWrapper } from './style-wrapper'
import { components } from './components'

interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string
}
export const Markdown = ({ children, ...restProps }: MarkdownProps) => {
  return (
    <StyleWrapper {...restProps}>
      <ReactMarkdown
        className='reacr-mark-down'
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </StyleWrapper>
  )
}
