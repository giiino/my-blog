import { create } from 'zustand'

import { ThemeMode } from '../types/ui'

interface ThemeModeState {
  themeMode: ThemeMode | undefined
  setThemeMode: (themeMode: ThemeModeState['themeMode']) => void
}

export const useThemeMode = create<ThemeModeState>((set) => ({
  themeMode: undefined,
  setThemeMode: (themeMode) => set(() => ({ themeMode }))
}))

interface PostCategoryState {
  postCategory: string
  setPostCategory: (category: PostCategoryState['postCategory']) => void
}

export const useCatrgory = create<PostCategoryState>((set) => ({
  postCategory: '',
  setPostCategory: (category) => set(() => ({ postCategory: category }))
}))
