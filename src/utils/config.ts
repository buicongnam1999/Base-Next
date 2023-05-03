interface ConfigCache {
    isSpeedFilterEnabled: boolean
  }
  
  const cache: Partial<ConfigCache> = {}
  
  export const isSpeedFilterEnabled = () => {
    if (cache.isSpeedFilterEnabled) {
      return cache.isSpeedFilterEnabled
    }
    cache.isSpeedFilterEnabled = process.env.NEXT_PUBLIC_SPEED_FILTER_ENABLED === '1'
    return process.env.NEXT_PUBLIC_SPEED_FILTER_ENABLED === '1'
  }
  