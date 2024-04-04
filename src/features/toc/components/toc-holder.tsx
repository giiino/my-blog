import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'
import { useRouter } from 'next/router'

import { getHeadings } from '../utils/get-headings'

export const TocHolder = (props: GridProps) => {
  const headingList = getHeadings()
  return (
    <ListContainer {...props}>
      <div></div>
    </ListContainer>
  )
}

const ListContainer = styled(Grid)`
  height: 100px;
  position: sticky;
  top: 100px;
  overflow-y: auto;
  align-self: flex-start;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`
