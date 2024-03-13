import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ThemeMode } from '../types/global'

interface ThemeModeState {
  themeMode: ThemeMode
  setThemeMode: (themeMode: ThemeModeState['themeMode']) => void
}

export const useThemeMode = create<ThemeModeState>()(
  persist(
    (set) => ({
      themeMode: 'light',
      setThemeMode: (themeMode) => {
        document.documentElement.setAttribute('data-theme', themeMode)
        set(() => ({ themeMode }))
      }
    }),
    {
      name: 'theme-mode'
    }
  )
)
