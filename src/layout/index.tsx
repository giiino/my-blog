import { ReactNode, useState } from 'react'

import { Stack } from '@mui/material'

import Footer from './Footer'
import Header from './Header'
import Siderbar from './Siderbar'

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <Stack sx={{ minHeight: 'inherit' }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Siderbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </Stack>
  )
}

export default Layout
