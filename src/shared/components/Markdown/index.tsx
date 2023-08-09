import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism'

//coy oneDark
import styled from '@emotion/styled'
import remarkGfm from 'remark-gfm'

// https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
// csharp
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
                style={materialOceanic as any}
                customStyle={{ borderRadius: 0 }}
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
      line-height: 2;
      margin-bottom: 25px;
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
          margin-left: 15px;
          margin-right: 10px;
        }
      }
      &.no-count::before {
        content: '•';
        margin-left: 15px;
        margin-right: 15px;
        font-weight: bold;
        color: var(--primary-blue-4);
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
      width: 100%;
      margin: 25px auto;
      color: #373223;
      padding: 1.2em 30px 1.2em 30px;
      border-left: 8px solid var(--primary-blue-4);
      line-height: 1.6;
      position: relative;
      background: var(--primary-blue-1);
      border-radius: 8px;
    }
  }
`
