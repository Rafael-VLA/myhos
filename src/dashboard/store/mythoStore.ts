import { Mytho } from '@/shared/interfaces/mytho'
import { Descendant } from 'slate'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Store = {
  mythos: Mytho[],
  currentMytho: Mytho | null,

  loadInitialData: (mythos: Mytho[]) => void;
  addMytho: (mytho:Mytho) => void,
  removeMytho: (id: string) => void,
  setCurrentMytho: (id?: string) => void,
  setContentCurrentMytho: (content: Descendant[]) => void 
}

export const useMythoStore = create<Store, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      mythos: [],
      currentMytho: null,

      loadInitialData: (mythos) => set((state) => ({ ...state, mythos })),
      addMytho: (mytho) => set((state) => ({...state, mythos: [...state.mythos, mytho]})),
      removeMytho: (id) => set((state) => {
        const newMythos = state.mythos.filter(mytho => mytho.id !== id)

        return {
            ...state,
            mythos: newMythos
        }
      }),
      setCurrentMytho: (id) => set((state) => ({...state, currentMytho: state.mythos.find(mytho => mytho.id === id) || null })),
      setContentCurrentMytho: (content) => set((state) => {
        let currentMytho =  state.currentMytho;

        if(currentMytho === null) return state;

        const id = currentMytho.id;

        const newMythos = state.mythos.map(mytho => {
          if(mytho.id === id){
            mytho.content = content;
            currentMytho = mytho;
          }

          return mytho
        });
      
        return { ...state, mythos: newMythos } // , currentMytho: { ...currentMytho }
      }) 
    }),
    {
      name: "mythos",
      storage: createJSONStorage(() => localStorage)
    }
  )
)