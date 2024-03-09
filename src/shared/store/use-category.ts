import { create } from 'zustand'

interface PostCategoryState {
  postCategory: string
  setPostCategory: (category: PostCategoryState['postCategory']) => void
}

export const useCategory = create<PostCategoryState>()((set) => ({
  postCategory: '',
  setPostCategory: (category) => set(() => ({ postCategory: category }))
}))
