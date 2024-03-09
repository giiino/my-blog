import React, { useEffect } from 'react'

import { ThemeProvider } from '@emotion/react'

import { styledThemeConf } from '../constants/conf/emotion-theme'
import { useThemeMode } from '../store/use-theme-mode'
import { ThemeMode } from '../types/global'

const EmotionThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeMode, setThemeMode } = useThemeMode()

  useEffect(() => {
    const root = document.documentElement
    const initialColorMode = root.style.getPropertyValue(
      '--initial-color-mode'
    ) as ThemeMode
    setThemeMode(initialColorMode)
  }, [])

  return (
    <ThemeProvider
      theme={themeMode ? styledThemeConf(themeMode) : styledThemeConf('light')}
    >
      {children}
    </ThemeProvider>
  )
}

export default EmotionThemeProvider
