import { PropsWithChildren } from 'react'

import styled from '@emotion/styled'

type LiProps = PropsWithChildren<{
  serialNumber?: number
}>

export const Li = ({ children, serialNumber }: LiProps) => {
  if (serialNumber) {
    return <Container serialnumber={serialNumber}>{children}</Container>
  }
  return <Container>{children}</Container>
}
const Container = styled.li<{
  serialnumber?: number
}>`
  position: relative;
  padding-left: 30px;
  &::before {
    position: absolute;
    left: ${({ serialnumber }) => (serialnumber ? '5px' : 0)};
    font-weight: ${({ serialnumber }) => (serialnumber ? 'initial' : 'bold')};
    color: ${({ serialnumber }) =>
      serialnumber ? 'initial' : 'var(--primary-blue-4)'};
    content: '${({ serialnumber }) =>
      serialnumber ? `${serialnumber}` : '•'}';
  }
`
