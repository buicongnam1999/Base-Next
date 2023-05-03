import create from 'zustand'
import { AccountInfoSlice, createAccountInfoSlice } from './accountInfo'
import { BalanceSlice, createBalanceSlice } from './balance'

type StoreSlice = AccountInfoSlice & BalanceSlice

export const useBoundStore = create<StoreSlice>()((...a) => ({
  ...createAccountInfoSlice(...a),
  ...createBalanceSlice(...a),
}))
