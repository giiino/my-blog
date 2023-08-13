import { ThemeOptions } from '@mui/material'

export const themeConf: ThemeOptions = {
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1100,
      xl: 1536
    }
  }
  // palette: {
  //   mode: 'dark'
  // }
}
