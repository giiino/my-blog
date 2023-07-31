import React from 'react'

import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

const Footer = () => {
  const { pathname } = useRouter()

  if (pathname.includes('edit')) {
    return null
  }

  return (
    <BoxWrapper component={'footer'}>
      <Typography variant='body2'>
        © {new Date().getFullYear()} by giiino. All rights reserved.
      </Typography>
    </BoxWrapper>
  )
}

export default Footer

const BoxWrapper = styled(Box)`
  height: 20vh;
  background-color: var(--primary-blue-1);
  margin-top: 20vh;
`
