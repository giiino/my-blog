import React, { useEffect, useRef, useState } from 'react'

import styled from '@emotion/styled'
import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton, IconButtonProps } from '@mui/material'

import { useCopyToClipboard } from '@/shared/hooks/use-copy-to-clipboard'

interface CopyButtonProps extends IconButtonProps {
  copyContent: string
}

export const CopyButton = ({
  copyContent,
  onClick,
  ...restProps
}: CopyButtonProps) => {
  const [isActive, setIsActive] = useState(false)
  const [_, copy] = useCopyToClipboard()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    copy(copyContent)
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
