import { TX_STATUS } from './common'
import { LOCAL_STORAGE_KEY } from './keys'
import { TOKEN_SYMBOL } from './token'

export interface Token {
  value: TOKEN_SYMBOL
  img: string
}

export type Action = 'deposit' | 'withdraw'

export interface TxData {
  action: Action
  token: TOKEN_SYMBOL
  amount: string
  amountAfterFee: string
  nonce?: string
  signature?: string
  status: TX_STATUS
}

export interface ITransaction {
  id: string
  from: string
  txHash: string
  timestamp: string
  txData: TxData
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getTxDataFromLocalStorage = (account: string | null | undefined) => {
  if (account) {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY.txDataLocalStorageKey) ?? '{}',
    ) as Record<string, ITransaction[]>

    if (typeof dataFromLocalStorage[account] !== 'undefined') {
      return dataFromLocalStorage[account]
    }
  }

  return []
}

export const saveDataToLocalStorage = (data: ITransaction[], account: string | null | undefined) => {
  if (!account) {
    return
  }
  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY.txDataLocalStorageKey) ?? '{}',
  ) as Record<string, ITransaction[]>
  const newData: Record<string, ITransaction[]> = {
    ...dataFromLocalStorage,
    [account]: data,
  }

  localStorage.setItem(LOCAL_STORAGE_KEY.txDataLocalStorageKey, JSON.stringify(newData))
}

export const removeDuplicateValueInArray = (arr: any[]) => {
  return arr.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
}
