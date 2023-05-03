import { ApolloClient, InMemoryCache, DefaultOptions, createHttpLink, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { gql } from 'graphql-tag'
import { getCookie } from 'cookies-next'
import { COOKIES_KEY, COOKIE_DOMAIN } from '../model/keys'

const graphServerUri = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:15000'
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const httpLink = createHttpLink({
  uri: graphServerUri,
})

const authLink = setContext((_, { headers }) => {
  const token = getCookie(COOKIES_KEY.WEB_ACCESS_TOKEN, { domain: COOKIE_DOMAIN }) as string
  let accessToken = ''

  if (token) {
    try {
      const tokenObj = JSON.parse(token)
      accessToken = tokenObj['appAccessToken']
    } catch (error) {
      console.error('Error parsing access token:', error)
    }
  }

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    defaultOptions,
  })
}

function getClient() {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (typeof window === 'undefined') {
    return _apolloClient
  }

  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

export { getClient, gql }
