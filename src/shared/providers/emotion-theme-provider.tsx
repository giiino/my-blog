import React, { useEffect, useMemo } from 'react'

import { ThemeProvider } from '@emotion/react'

import { styledThemeConf } from '../constants/conf/emotion-theme'
import { useThemeMode } from '../store/use-theme-mode'
import { ThemeMode } from '../types/ui'

const EmotionThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeMode, setThemeMode } = useThemeMode()
  const emotionTheme = useMemo(() => {
    if (!themeMode) {
      return styledThemeConf('light')
    }
    return styledThemeConf(themeMode)
  }, [themeMode])

  useEffect(() => {
    const root = document.documentElement
    const initialColorMode = root.style.getPropertyValue(
      '--initial-color-mode'
    ) as ThemeMode
    setThemeMode(initialColorMode)
  }, [setThemeMode])

  return <ThemeProvider theme={emotionTheme}>{children}</ThemeProvider>
}

export default EmotionThemeProvider
