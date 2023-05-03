export const ONE_YEAR_IN_SECONDS = 31536000

export enum TX_STATUS {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum SUB_MENU {
  NONE = 'none',
  TRANSACTION = 'transaction',
}

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}

export enum WALLET_TYPE {
  METAMASK = 'MetaMask',
  WALLET_CONNECT = 'WalletConnect',
}

export interface WebAccountInfo {
  username: string
  email: string
  isLinked: boolean
  codeExpiredAt: number
}

export interface AppAccountInfo {
  appAccessToken: string
  expiresAt?: number
  refreshToken?: string
  tokenType?: string
}

export const SOCIAL_NETWORKS = []
