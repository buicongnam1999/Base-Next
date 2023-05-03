import { getCookie, deleteCookie } from 'cookies-next'
import jwt from 'jsonwebtoken'
import { COOKIES_KEY } from '@src/models/keys'
import { AppAccountInfo } from '@src/models/common'
import dayjs from '@utils/dayjs'

export enum STATUS_ACCESS_TOKEN {
  EXPIRED = 'EXPIRED',
  UNEXPIRED = 'UNEXPIRED',
  NO_ACCESS_TOKEN = 'NO_ACCESS_TOKEN',
  INVALID = 'INVALID',
}

export function checkExpiresAccessToken(accessToken = '', wallet = ''): STATUS_ACCESS_TOKEN {
  if (accessToken) {
    let accessTokenData
    try {
      accessTokenData = jwt.decode(accessToken)
    } catch (error) {
      deleteCookie(COOKIES_KEY.WEB_ACCESS_TOKEN)
    }
    if (accessTokenData && typeof accessTokenData !== 'string') {
      const expired = dayjs.utc().valueOf() > (accessTokenData as any).exp * 1000

      if (expired) {
        // case het han
        return STATUS_ACCESS_TOKEN.EXPIRED
      } else if (wallet && (accessTokenData as any)?.wallet?.toLowerCase() !== wallet.toLowerCase()) {
        return STATUS_ACCESS_TOKEN.INVALID
      } else {
        return STATUS_ACCESS_TOKEN.UNEXPIRED
      }
    } else {
      return STATUS_ACCESS_TOKEN.NO_ACCESS_TOKEN
    }
  } else {
    return STATUS_ACCESS_TOKEN.NO_ACCESS_TOKEN
  }
}

export function checkIsAppAccessTokenExpired(): STATUS_ACCESS_TOKEN {
  const appAccountInfo = getCookie(COOKIES_KEY.APP_ACCOUNT_INFO)
  if (!appAccountInfo) {
    return STATUS_ACCESS_TOKEN.NO_ACCESS_TOKEN
  }
  const appAccountInfoJson = JSON.parse(appAccountInfo as string) as AppAccountInfo
  const appAccessToken = appAccountInfoJson.appAccessToken
  const expiredAt = appAccountInfoJson.expiresAt
  if (appAccessToken && expiredAt) {
    if (dayjs.utc(expiredAt * 1000).isBefore(dayjs.utc())) {
      return STATUS_ACCESS_TOKEN.EXPIRED
    } else {
      return STATUS_ACCESS_TOKEN.UNEXPIRED
    }
  } else {
    return STATUS_ACCESS_TOKEN.NO_ACCESS_TOKEN
  }
}
