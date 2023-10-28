import { ThemeMode } from '../types/ui'

export function getInitialColorMode() {
  if (typeof window === 'undefined') {
    return undefined
  }
  const themeMode = window.localStorage.getItem(
    'theme-mode'
  ) as ThemeMode | null

  if (themeMode === 'light' || themeMode === 'dark') {
    return themeMode
  }

  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasDeviceThemeMode = typeof mql.matches === 'boolean'
  if (hasDeviceThemeMode) {
    return mql.matches ? 'dark' : 'light'
  }
  return 'light'
}
