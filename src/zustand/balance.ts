import { StateCreator } from 'zustand'

export interface BalanceSlice {
  maticBalance: string
  saveMaticBalance: (payload: string) => void
  resetBalance: () => void
}

export const createBalanceSlice: StateCreator<BalanceSlice, [], [], BalanceSlice> = (set) => ({
  maticBalance: '0',
  saveMaticBalance: (payload: string) =>
    set(() => ({
      maticBalance: payload,
    })),
  resetBalance: () => set(() => ({ maticBalance: '' })),
})
