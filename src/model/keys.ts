export const WAGMI_STORAGE_PREFIX = 'wagmi'

export enum LOCAL_STORAGE_KEY {
  wagmiCache = `wagmi.cache`,
  wallet = 'wagmi.wallet',
  connected = 'wagmi.connected',
  equipSignature = 'equipSignature',
  withdrawExpiresTime = 'withdrawExpiresTime',
  myAssetsProcessingTx = 'myAssetsProcessingTx',
  prevLink = 'prevLink',
  txDataLocalStorageKey = 'txDataLocalStorageKey',
}

export enum COOKIES_KEY {
  WEB_ACCESS_TOKEN = '_web_access_token',
  APP_ACCOUNT_INFO = '_app_account_info',
  WEB_ACCOUNT_INFO = '_web_account_info',
  ACCOUNT_INFO = '_account_info',
}

export enum QUERY_NAME {
  PAGE = 'page',
  TYPE = 'type',
  SPEED = 'speed',
  RARITY = 'rarity',
  MIN = 'minLevel',
  MAX = 'maxLevel',
}

export enum REACT_QUERY_KEYS {
  CHECK_WALLET_LINKED = 'check_wallet_linked',
}

export const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost'
