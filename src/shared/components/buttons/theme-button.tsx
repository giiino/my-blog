import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import { useThemeMode } from '@/shared/store/use-theme-mode'

export const ThemeButton = () => {
  const { themeMode, setThemeMode } = useThemeMode()
  const theme = document.documentElement.getAttribute('data-theme')
  const ThemeModeIcon = theme === 'light' ? DarkModeIcon : LightModeIcon

  const toggleMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  return <ThemeModeIcon sx={{ cursor: 'pointer' }} onClick={toggleMode} />
}
