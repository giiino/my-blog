import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ThemeMode } from '../types/global'

interface ThemeModeState {
  themeMode: ThemeMode | undefined
  setThemeMode: (themeMode: ThemeModeState['themeMode']) => void
}

export const useThemeMode = create<ThemeModeState>()(
  persist(
    (set) => ({
      themeMode: undefined,
      setThemeMode: (themeMode) => set(() => ({ themeMode }))
    }),
    {
      name: 'theme-mode'
    }
  )
)
