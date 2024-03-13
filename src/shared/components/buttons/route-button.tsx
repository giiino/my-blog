import styled from '@emotion/styled'
import Link from 'next/link'

export const RouteButton = styled(Link)`
  font-size: 16px;
  color: var(--color-text);
  line-height: 16px;
  text-decoration: none;
  transition: 0.15s;
  user-select: none;
  &:hover {
    color: var(--color-header-tab-hover);
  }
  &:active {
    transform: translateY(2px);
  }
`
