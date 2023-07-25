import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'

const TocHolder = (props: GridProps) => {
  return (
    <ListContainer {...props}>
      <div style={{ background: 'red' }}>TocHolder</div>
    </ListContainer>
  )
}

export default TocHolder

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
