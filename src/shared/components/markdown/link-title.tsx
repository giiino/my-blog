import React, { useState } from 'react'

import LinkIcon from '@mui/icons-material/Link'
import { IconButton, styled } from '@mui/material'
import Link from 'next/link'

import { useCopyToClipboard } from '@/shared/hooks/use-copy-to-clipboard'
import { defer } from '@/shared/utils/wrapper'

interface LinkTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  role: 'h3' | 'h4'
  children: React.ReactNode
}

export const LinkTitle = ({
  role: Title,
  children,
  ...restProps
}: LinkTitleProps) => {
  const [isHover, setIsHover] = useState(false)
  const [_, copy] = useCopyToClipboard()

  const handleLinkClick = () => {
    defer(() => copy(window.location.href))
  }

  return (
    <Title
      id={String(children)}
      {...restProps}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
      <LinkWrapper opacticy={isHover ? '1' : '0'} href={`#${String(children)}`}>
        <IconButton disableRipple onClick={handleLinkClick}>
          <LinkIcon className='link-icon' />
        </IconButton>
      </LinkWrapper>
    </Title>
  )
}

const LinkWrapper = styled(Link)<{
  opacticy: '1' | '0'
}>`
  .link-icon {
    font-size: 19px;
    color: var(--color-markdown-link-btn);
    opacity: ${({ opacticy }) => opacticy};
    rotate: 45deg;
    &:hover {
      color: var(--primary-link);
    }
  }
`
