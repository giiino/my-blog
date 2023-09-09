import styled from '@emotion/styled'
import Link from 'next/link'

export const RouteButton = styled(Link)`
  font-size: 16px;
  color: ${({ theme }) => theme.color};
  line-height: 16px;
  text-decoration: none;
  transition: 0.15s;
  &:hover {
    color: ${({ theme }) => theme.header.tabHoverColor};
  }
  &:active {
    transform: translateY(2px);
  }
`
