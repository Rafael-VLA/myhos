import { create } from "zustand"
import { MessageHistory } from "../interfaces/message-history"
import { createJSONStorage, persist } from "zustand/middleware"

type Store = {
    messageHistory: MessageHistory[],
    addMessageHistory: (message: MessageHistory) => void;
    cleanMessageHistory: (idMytho: string) => void;
}

export const useAIStore = create<Store, [["zustand/persist", unknown]]>(
    persist(
        (set) => ({
            messageHistory: [],
            addMessageHistory: (message) => set((state) => ({ ...state, messageHistory: [...state.messageHistory, message]})),
            cleanMessageHistory: (idMytho) => set((state) => ({ ...state, messageHistory: state.messageHistory.filter(e => e.idMytho !== idMytho)}))
        }),
        {
            name: "history",
            storage: createJSONStorage(() => localStorage)
        }
    )
)