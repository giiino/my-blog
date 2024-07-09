import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

import { TObject, ThemeMode } from '@/shared/types/global'

export default function Document() {
  return (
    <Html lang='zh-Hant-TW'>
      <Head />
      <body>
        <Script
          id='theme-check'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: blockingSetInitialColorMode
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

const blockingSetInitialColorMode = `  
function setInitialColorMode() {
  function getStorePersistState(key) {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value).state : null
  }
  function getInitialColorMode() {
    const themeMode = getStorePersistState('theme-mode')?.themeMode

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

  const Mode = getInitialColorMode()
  document.documentElement.setAttribute('data-theme', Mode)
}

  setInitialColorMode();
`
