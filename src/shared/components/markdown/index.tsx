import { forwardRef } from 'react'
import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm'

import { components } from './components'
import { StyleWrapper } from './style-wrapper'

interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string
}
export const Markdown = forwardRef<HTMLDivElement, MarkdownProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <StyleWrapper ref={ref} {...restProps}>
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
)
