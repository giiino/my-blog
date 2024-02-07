import styled from '@emotion/styled'
import { Grid } from '@mui/material'

export * from './Content'
export * from './post-menu'
export * from './Menu'

export const PostWrapper = styled(Grid)`
  width: 95%;
  max-width: 1240px;
  margin: 0 auto;
  margin-bottom: 5vh;
  @media screen and (max-width: 960px) {
    width: 92%;
  }
`