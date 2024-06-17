import { ReactNode, useState } from 'react'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { Noto_Sans_TC } from 'next/font/google'

import Footer from './footer'
import Header from './header'
import Siderbar from './siderbar'

const notoSansTC = Noto_Sans_TC({ subsets: ['latin'] })

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <Stack className={notoSansTC.className} sx={{ minHeight: 'inherit' }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Siderbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </Stack>
  )
}

const PageWrapper = styled.main`
  flex: 1;
  color: var(--color-text);
  background-color: var(--color-bg);
`

export default Layout
