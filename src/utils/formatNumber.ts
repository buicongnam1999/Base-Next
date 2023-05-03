import { formatEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'

interface FormatNumberOptions {
  withSymbol: boolean
  symbol: string
  precision: number
  minimumFractionDigits: number
}

const DEFAULT_PRECISION = 3

export function formatCurrency(
  amount?: BigNumber | number,
  { withSymbol, precision, symbol, minimumFractionDigits = 0 }: Partial<FormatNumberOptions> = {},
): string {
  if (amount === null || typeof amount === 'undefined') {
    return '--'
  }
  if (typeof withSymbol === 'undefined') {
    withSymbol = true
  }
  if (typeof symbol === 'undefined') {
    symbol = 'MATIC'
  }
  if (typeof precision === 'undefined') {
    precision = DEFAULT_PRECISION
  }
  let formattingAmount
  if (amount instanceof BigNumber) {
    formattingAmount = Number(formatEther(amount))
  } else {
    formattingAmount = Number(amount)
  }

  if (formattingAmount < 0) {
    return 'N/A' + (withSymbol ? ' ' + symbol : '')
  }

  return (
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits,
      maximumFractionDigits: precision,
    })
      .format(formattingAmount)
      .toString() + (withSymbol ? ' ' + symbol : '')
  )
}
