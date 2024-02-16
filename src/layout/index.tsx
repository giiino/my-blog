import { ReactNode, useState } from 'react'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'

import Footer from './footer'
import Header from './header'
import Siderbar from './siderbar'

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <Stack sx={{ minHeight: 'inherit' }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Siderbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </Stack>
  )
}

const PageWrapper = styled.main`
  flex: 1;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
`

export default Layout
