import { ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'

import Footer from './Footer'
import Header from './Header'
import Siderbar from './Siderbar'

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Siderbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
