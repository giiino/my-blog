// https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
// style: coy oneDark
import { useMemo, useState } from 'react'
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps
} from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import styled from '@emotion/styled'
import { css } from '@mui/material'

import { CopyButton } from '../buttons/copy-button'

interface CodeProps extends Omit<SyntaxHighlighterProps, 'children'> {
  children: string[]
}

export const Code = ({ children, ...props }: CodeProps) => {
  const [isHover, setIsHover] = useState(false)
  const replacedLastWordCode = useMemo(() => {
    return children.map((item, index) => {
      if (index === 0) {
        return item.slice(0, -1)
      }
      return item
    })
  }, [children])

  const handleMouseEnter = () => setIsHover(true)
  const handleMouseLeave = () => setIsHover(false)

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SyntaxHighlighter
        showLineNumbers={true}
        style={coldarkDark}
        PreTag='div'
        className='syntax-hight-wrapper'
        {...props}
      >
        {replacedLastWordCode}
      </SyntaxHighlighter>
      <CopyButton
        copyContent={replacedLastWordCode[0]}
        css={css`
          display: ${isHover ? 'default' : 'none'};
          position: absolute;
          top: 10px;
          right: 10px;
        `}
      />
    </Container>
  )
}

const Container = styled.section`
  border-radius: 10px;
  position: relative;
`
