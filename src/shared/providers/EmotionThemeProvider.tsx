import React, { useEffect, useMemo } from 'react'

import { ThemeProvider } from '@emotion/react'

import { styledThemeConf } from '../constants/conf/emotionTheme'
import { ThemeMode } from '../types/ui'
import { useGlobalState } from './GlobalStateProvider'

const EmotionThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeMode, setThemeMode } = useGlobalState()
  const emotionTheme = useMemo(() => {
    if (!themeMode) {
      return {}
    }
    return styledThemeConf(themeMode)
  }, [themeMode])

  useEffect(() => {
    const root = document.documentElement
    const initialColorMode = root.style.getPropertyValue(
      '--initial-color-mode'
    ) as ThemeMode
    setThemeMode(initialColorMode)
  }, [])

  useEffect(() => {}, [])

  if (!themeMode) {
    return null
  }
  return <ThemeProvider theme={emotionTheme}>{children}</ThemeProvider>
}

export default EmotionThemeProvider
