import logger from './logger'

export function safeParseJSON<T>(value: string, defaultValue: any = null): T {
  try {
    return value ? JSON.parse(value) || defaultValue : defaultValue
  } catch (error: any) {
    logger.error('json parse error', error.message)

    return defaultValue
  }
}
