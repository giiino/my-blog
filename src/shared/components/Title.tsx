import React from 'react'

import styled from '@emotion/styled'

// interface TitleProps extends React.HTMLAttributes<HTMLTitleElement> {}

// export const Title = ({ children }: TitleProps) => {
//   return <Container>{children}</Container>
// }

export const Title = styled.h2`
  color: ${({ theme }) => theme.section.titleColor};
`
