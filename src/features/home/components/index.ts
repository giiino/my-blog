import styled from '@emotion/styled'

import { Title } from '@/shared/components/Title'

export * from './Banner'
export * from './Latest'

export const SectionTitle = styled(Title)<{
  show: boolean
}>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  text-align: center;
  padding-top: 35px;
`
