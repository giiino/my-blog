import React from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

interface PageLoadingProps extends React.ComponentProps<typeof Backdrop> {}

export const PageLoading = (props: PageLoadingProps) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => Math.max.apply(Math, Object.values(theme.zIndex)) + 1
      }}
      {...props}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
