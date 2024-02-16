import React, { useEffect, useMemo } from 'react'

import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'

import { styledThemeConf } from '../constants/conf/emotion-theme'
import { getInitialColorMode } from '../utils/get-initial-color-mode'
import { useGlobalState } from './global-state-provider'

const EmotionThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeMode, setThemeMode } = useGlobalState()
  const emotionTheme = useMemo(() => {
    if (!themeMode) {
      return styledThemeConf('light')
    }
    return styledThemeConf(themeMode)
  }, [themeMode])

  useEffect(() => {
    setThemeMode(getInitialColorMode())
  }, [setThemeMode])

  return (
    <ThemeProvider theme={emotionTheme}>
      <PageLoadingFilter loadFinished={!!themeMode} />
      {children}
    </ThemeProvider>
  )
}

export default EmotionThemeProvider

const PageLoadingFilter = styled.div<{
  loadFinished: boolean
}>`
  display: ${({ loadFinished }) => (loadFinished ? 'none' : 'block')};
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 999999999;
`
