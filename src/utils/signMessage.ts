import { SiweMessage } from 'siwe'

const domain = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : window.location.host
const origin = typeof window === 'undefined' ? '/' : window.location.origin

export function createSiweMessage(address: string, statement: string) {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? '80001'),
  })

  return message.prepareMessage()
}
