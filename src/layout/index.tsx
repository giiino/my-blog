import { ReactNode } from 'react'

import Header from './Header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main style={{ marginTop: '64px' }}>{children}</main>
    </>
  )
}

export default Layout
