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
        className='reacr-mark-down'
        remarkPlugins={[remarkGfm]}
        components={{
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
  .reacr-mark-down {
    > * {
      margin-bottom: 5px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 16px 0;
    }
    h1 {
      font-size: 30px;
    }

    p {
      white-space: pre-line;
    }
    ol,
    ul {
      list-style-type: none;
    }
    li {
      &.count {
        .serial-number {
          margin-right: 10px;
        }
      }
      &.no-count::before {
        content: '•';
        margin-right: 10px;
        font-weight: bold;
        color: #9696f5;
      }
    }
    hr {
      height: 1px;
      background-color: #ccc;
      border: none;
      margin: 20px 0;
    }
    pre {
      margin: 20px 0;
    }
    blockquote {
      font-size: 14px;
      width: 100%;
      margin: 25px auto;
      font-family: Open Sans;
      color: #555555;
      padding: 1.2em 30px 1.2em 30px;
      border-left: 8px solid #78c0a8;
      line-height: 1.6;
      position: relative;
      background: #ededed;
    }
  }
`
