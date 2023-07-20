import React, { ReactNode } from 'react'

import { Box, Grid } from '@mui/material'

import Header from './Header'
import Menu from './Menu'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      {/* <Grid container columnSpacing={2} sx={{ mt: 8 }}>
        <Grid item xs={3}>
          <Menu />
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
        <Grid item xs={3}>
          123
        </Grid>
      </Grid> */}
    </>
  )
}

export default Layout

// export async function getServerSideProps() {
//   const data = await getUserInfo()
//   return {
//     props: {
//       data: JSON.parse(JSON.stringify(data))
//     }
//   }
// }
