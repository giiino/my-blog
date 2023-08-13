import React from 'react'

import styled from '@emotion/styled'
import CancelIcon from '@mui/icons-material/Cancel'
import { Stack } from '@mui/material'
import Link from 'next/link'

const Error = () => {
  return (
    <Container spacing={3}>
      <CancelIcon sx={{ color: '#cb5757' }} fontSize='large' />
      <h3>
        認證過程中發生錯誤，<Link href={'/'}>回首頁</Link>
      </h3>
    </Container>
  )
}

export default Error

const Container = styled(Stack)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
  h3 {
    color: var(--primary-gray-200);
  }
  a {
    color: #6f6fcd;
    text-decoration: underline;
    &:hover {
      color: #49498d;
    }
  }
`
