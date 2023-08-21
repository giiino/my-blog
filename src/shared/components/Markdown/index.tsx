import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm'

import { StyleWrapper } from './StyleWrapper'
import { components } from './components'

export const Markdown = ({ children }: { children: string }) => {
  return (
    <StyleWrapper>
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
