import { AppAccountInfo } from '@src/models/common'
import dayjs from '@utils/dayjs'
import { setCookie } from 'cookies-next'
import shallow from 'zustand/shallow'
import { COOKIES_KEY } from '@src/models/keys'
import { useBoundStore } from '@src/zustand'
import logger from '@utils/logger'
import { refreshAccessToken } from '@utils/serverUtils'

export const useRefreshToken = () => {
  const { appAccountInfo, saveAppAccountInfo } = useBoundStore(
    (state) => ({
      appAccountInfo: state.appAccountInfo,
      saveAppAccountInfo: state.saveAppAccountInfo,
    }),
    shallow,
  )

  const getNewRefreshToken = async () => {
    try {
      if (appAccountInfo.expiresAt && dayjs.utc().isAfter(dayjs.utc(appAccountInfo.expiresAt * 1000))) {
        const response = await refreshAccessToken({
          refreshToken: appAccountInfo.refreshToken || '',
          accessToken: appAccountInfo.appAccessToken,
        })
        if (response.success && response.data) {
          const newAppAccountInfo: AppAccountInfo = {
            appAccessToken: response.data.appAccessToken,
            expiresAt: dayjs.utc().add(response.data.expiresIn, 'second').unix(),
            refreshToken: response.data.refreshToken,
            tokenType: response.data.tokenType,
          }
          saveAppAccountInfo(newAppAccountInfo)
          setCookie(COOKIES_KEY.APP_ACCOUNT_INFO, JSON.stringify(newAppAccountInfo), {
            maxAge: response.data.expiresIn,
            secure: true,
          })
          return { success: true }
        }
      }

      return { success: false }
    } catch (error) {
      logger.error('[refreshToken]', error)
      return { success: false }
    }
  }

  return { getNewRefreshToken }
}
