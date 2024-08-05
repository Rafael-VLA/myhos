import { create } from 'zustand'

type Store = {
  open: boolean,
  selectedTextToSend: string,
  setOpen: (value: boolean) => void,
  setSelectedTextToSend: (text: string) => void 
}

export const useUIStore = create<Store>()((set) => ({
  open: false,
  selectedTextToSend: "",

  setOpen: (value) => set(() => ({ open: value })),
  setSelectedTextToSend: (text) => set((state) => ({ ...state, selectedTextToSend: text }))
}))