import { getClient, gql } from '../../utils/graphql'
import { IAuthenticateInput, IAuthenticatePayload } from '../types/mutationType'

export async function login({ email, password }: IAuthenticateInput) {
  const result = await getClient().mutate<{ authenticate: IAuthenticatePayload }>({
    mutation: gql`
      
    `,
    variables: {
      input: {
        email: email,
        password: password,
      },
    },
  })

  if(result.data && result.data.authenticate) {
    return result.data.authenticate
  }

  return null
}
