import { TOKEN_SYMBOL } from './token'

export const DEFAULT_HEADERS = {
  'X-Application': 'App',
  'Content-Type': 'application/json',
}

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:9000'
export const APP_API_ENDPOINT = process.env.NEXT_PUBLIC_APP_API_ENDPOINT ?? 'http://localhost:9000'

// general
export interface Response<T> {
  success: boolean
  data: T | null
  message?: string
  errorCode?: string
}

// Authentication
export interface IConnectWalletNonceInput {
  wallet: string
}
export interface IConnectWalletNonceResponseClient {
  nonce: string
}

export interface IVerifyConnectWalletSignatureInput {
  wallet: string
  message: string
  signature: string
}
export interface IVerifyConnectWalletSignatureResponseClient {
  token: string
  expiresIn: number
  wallet: string
}

// Maintenance mode
export interface IMaintenanceModeResponseServer {
  remote_config: {
    version: number
    config: {
      maintenance_mode: boolean
      maintenance_ends_at: number | null
    }
  }
}

export interface IMaintenanceModeResponseClient {
  remoteConfig: {
    version: number
    config: {
      maintenanceMode: boolean
      maintenanceEndsAt: number | null
    }
  }
}

// Link wallet
export interface AppApiError {
  error_code: string
  error_message: string
}
export interface AppApiResponse<T> {
  success: number
  data: T | null
  message?: string
  error?: AppApiError
}
export interface CheckIsWalletLinked {
  appAccessToken: string
}
export interface ICheckIsWalletLinkedResponseClient {
  isLinked: boolean
  email: string
  wallet: string | null
}
export interface ICheckIsWalletLinkedResponseServer {
  email: string
  wallet_address: string | null
}

export interface LinkWalletInput {
  accessToken: string
  address: string
  signature: string
}

export interface ILinkWalletResponseClient {
  linked: boolean
}

// register
export interface IRegisterAccountResponseServer {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: TOKEN_SYMBOL
}

export interface IRegisterAccountResponseClient {
  appAccessToken: string
  expiresIn: number
  refreshToken: string
  tokenType: TOKEN_SYMBOL
}

// forgot password
export interface IForgotPasswordInput {
  email: string
  verificationCode: string
  newPassword: string
}
