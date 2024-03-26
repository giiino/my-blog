import { createTheme, ThemeProvider } from '@mui/material/styles'

const muiTheme = createTheme({
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
})
const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
