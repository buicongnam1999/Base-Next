import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const useRemainingDays = (targetDate: string) => {
  const [remainingDays, setRemainingDays] = useState<number>(0)

  useEffect(() => {
    const now = dayjs()
    const target = dayjs(targetDate)
    const diffInDays = target.diff(now, 'day')
    setRemainingDays(diffInDays)
  }, [targetDate])

  return remainingDays
}

export default useRemainingDays
