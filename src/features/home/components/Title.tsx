import React from 'react'

import styled from '@emotion/styled'

export const Title = ({ children }: { children?: React.ReactNode }) => {
  return <Container>{children}</Container>
}

const Container = styled.h2`
  text-align: center;
  padding-top: 35px;
  color: var(--primary-blue-4);
`
