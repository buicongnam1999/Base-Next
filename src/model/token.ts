import { CHAIN_ID, CONTRACT_NAME, CONTRACT_ADDRESSES } from '@src/contracts'
import { SUPPORTED_NETWORK_CHAIN_ID } from '@src/contracts/network'
import logger from '@utils/logger'

export enum TOKEN_SYMBOL {
  MATIC = 'MATIC',
}

export const getTokenBuyUrl = (token: TOKEN_SYMBOL) => {
  const USDTContract = CONTRACT_ADDRESSES[CHAIN_ID][CONTRACT_NAME.USDT]
  return `https://app.uniswap.org/#/swap?inputCurrency=${USDTContract}&outputCurrency=${token}`
}

export const getTokenName = (token: TOKEN_SYMBOL): string => {
  if (CHAIN_ID === SUPPORTED_NETWORK_CHAIN_ID.MAINNET) {
    return token
  }
  return `${token}_T`
}

export const CONTRACTS = {}

export async function addTokenToWallet() {
  if (!(window as any).ethereum) {
    logger.error('addTokenToWallet', 'No wallet active')
    return
  }
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await (window as any).ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: 'token.address', // The address that the token is at.
          symbol: 'token.symbol', // A ticker symbol or shorthand, up to 5 chars.
          decimals: 'token.decimals', // The number of decimals in the token
          image: 'token.image', // A string url of the token logo
        },
      },
    })

    return wasAdded
  } catch (error) {
    logger.error('addTokenToWallet', error)
  }
}
