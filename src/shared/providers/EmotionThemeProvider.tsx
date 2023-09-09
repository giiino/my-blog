import React, { useMemo } from 'react'

import { ThemeProvider } from '@emotion/react'

import { styledThemeConf } from '../constants/conf/emotionTheme'
import { useGlobalState } from './GlobalStateProvider'

const EmotionThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeMode } = useGlobalState()
  const emotionTheme = useMemo(() => {
    if (!themeMode) {
      return {}
    }
    return styledThemeConf(themeMode)
  }, [themeMode])

  if (!themeMode) {
    return null
  }
  return <ThemeProvider theme={emotionTheme}>{children}</ThemeProvider>
}

export default EmotionThemeProvider
