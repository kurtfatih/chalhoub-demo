import { create } from "zustand"

type AppStore = {
  columnCount: number
  setColumnCount: (columnCount: number) => void
  colors: string[]
  setColors: (colors: string[]) => void
  tag: string
  setTag: (tag: string) => void
  prices: { start: number; end: number }[]
  setPrices: (prices: { start: number; end: number }[]) => void
  sortByPrice?: "asc" | "desc"
  setSortByPrice: (sortByPrice?: "asc" | "desc") => void
}

export const useStore = create<AppStore>()((set) => ({
  columnCount: 2,
  setColumnCount: (columnCount) => set({ columnCount }),
  colors: [],
  setColors: (colors) => set({ colors }),
  tag: "",
  setTag: (tag) => set({ tag }),
  prices: [],
  setPrices: (prices) => set({ prices }),
  setSortByPrice: (sortByPrice) => set({ sortByPrice })
}))
