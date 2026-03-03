import { create } from 'zustand'

type ThemeMode = 'light' | 'dark'

interface ThemeStore {
  mode: ThemeMode
  toggleTheme: () => void
}

const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'light',
  toggleTheme: () =>
    set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
}))

export default useThemeStore