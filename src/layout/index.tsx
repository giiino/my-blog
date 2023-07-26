import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Header from './Header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster position='bottom-center' />
    </>
  )
}

export default Layout
