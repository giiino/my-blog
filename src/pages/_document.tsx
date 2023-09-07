import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

import { ThemeMode } from '@/shared/types/ui'

export default function Document() {
  return (
    <Html lang='zh-Hant-TW'>
      <Head />
      <body>
        <Script id='theme-check' strategy='beforeInteractive'>
          {blockingSetInitialColorMode}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

function setInitialColorMode() {
  function getInitialColorMode() {
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

  const Mode = getInitialColorMode()
  const root = document.documentElement
  root.style.setProperty('--initial-color-mode', Mode)

  if (Mode === 'dark')
    document.documentElement.setAttribute('data-theme', 'dark')
}

const blockingSetInitialColorMode = `(function() {
  ${setInitialColorMode.toString()}
  setInitialColorMode();
})()
`
