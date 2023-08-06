import styled from '@emotion/styled'
import { Grid } from '@mui/material'

export * from './Content'
export * from './ArticleMenu'

export const ArticleWrapper = styled(Grid)`
  width: 95%;
  max-width: 1240px;
  margin: 0 auto;
  @media screen and (max-width: 960px) {
    width: 85%;
  }
`
