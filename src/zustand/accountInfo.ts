import { AppAccountInfo, WebAccountInfo } from '../model/common'
import { StateCreator } from 'zustand'

export interface AccountInfoSlice {
  accountInfo: WebAccountInfo
  webAccessToken: string
  appAccountInfo: AppAccountInfo
  saveWebAccountInfo: (payload: WebAccountInfo) => void
  saveWebAccessToken: (payload: string) => void
  saveAppAccountInfo: (payload: AppAccountInfo) => void
  removeAccountInfo: () => void
  removeWebAccessToken: () => void
  removeAppAccountInfo: () => void
}

export const createAccountInfoSlice: StateCreator<AccountInfoSlice, [], [], AccountInfoSlice> = (set) => ({
  accountInfo: {
    username: '',
    email: '',
    isLinked: false,
    codeExpiredAt: 0,
  },
  webAccessToken: '',
  appAccountInfo: {
    appAccessToken: '',
    expiresAt: -1,
    refreshToken: '',
    tokenType: '',
  },
  saveWebAccountInfo: (payload: WebAccountInfo) =>
    set(() => ({
      accountInfo: payload,
    })),
  saveWebAccessToken: (payload: string) =>
    set(() => ({
      webAccessToken: payload,
    })),
  saveAppAccountInfo: (payload: AppAccountInfo) =>
    set(() => ({
      appAccountInfo: payload,
    })),
  removeAccountInfo: () => set(() => ({ accountInfo: { username: '', email: '', isLinked: false, codeExpiredAt: 0 } })),
  removeWebAccessToken: () => set(() => ({ webAccessToken: '' })),
  removeAppAccountInfo: () =>
    set(() => ({
      appAccountInfo: {
        appAccessToken: '',
        expiresAt: -1,
        refreshToken: '',
        tokenType: '',
      },
    })),
})
