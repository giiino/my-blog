import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

//coy
import styled from '@emotion/styled'
import remarkGfm from 'remark-gfm'

// https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html

export const Markdown = ({ children }: { children: string }) => {
  return (
    <MarkDownStyle>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ children = [], className, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return (
              <SyntaxHighlighter
                language={match?.[1]}
                showLineNumbers={true}
                style={dracula as any}
                PreTag='div'
                className='syntax-hight-wrapper'
                {...props}
              >
                {children as string[]}
              </SyntaxHighlighter>
            )
          }
        }}
      >
        {children}
      </ReactMarkdown>
    </MarkDownStyle>
  )
}

const MarkDownStyle = styled.div`
  /* h1 {
    color: red;
  } */
`
