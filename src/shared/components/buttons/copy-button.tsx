import React, { useEffect, useRef, useState } from 'react'

import styled from '@emotion/styled'
import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton, IconButtonProps } from '@mui/material'

interface CopyButtonProps extends IconButtonProps {
  copyContent: string
}

export const CopyButton = ({
  copyContent,
  onClick,
  ...restProps
}: CopyButtonProps) => {
  const [isActive, setIsActive] = useState(false)
  const textAreaRef: React.RefObject<HTMLTextAreaElement> = useRef(null)

  const copyToClipboard = (text: string) => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.display = ''
      textAreaRef.current.value = text
      textAreaRef.current.select()
      document.execCommand('copy')
      textAreaRef.current.style.display = 'none'
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    copyToClipboard(copyContent)
    setIsActive(true)
  }

  useEffect(() => {
    if (!isActive) return
    const timer = setTimeout(() => {
      setIsActive(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [isActive])

  return (
    <>
      <StyledIconButton
        color='default'
        size='small'
        onClick={handleClick}
        {...restProps}
      >
        {isActive ? (
          <CheckIcon fontSize='small' color='success' />
        ) : (
          <ContentCopyIcon fontSize='small' />
        )}
      </StyledIconButton>
      <textarea ref={textAreaRef} style={{ display: 'none' }} readOnly />
    </>
  )
}

const StyledIconButton = styled(IconButton)`
  position: relative;
  color: var(--primary-gray-300);
  border-radius: 20%;
  &:hover {
    color: var(--primary-gray-200);
    background: #ffffff21;
  }
`
