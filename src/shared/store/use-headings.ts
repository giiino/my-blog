import { create } from 'zustand'

export type Heading = Record<'title' | 'id', string>

export interface HeadingsData extends Heading {
  items: Heading[]
}

interface HeadingsState {
  headings: HeadingsData[]
  setHeadings: (headings: HeadingsState['headings']) => void
}

export const useHeadings = create<HeadingsState>()((set) => ({
  headings: [],
  setHeadings: (headings) => set(() => ({ headings }))
}))
