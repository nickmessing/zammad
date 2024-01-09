/// <reference types="@vueuse/shared" />
import { ApolloLink } from '@apollo/client/core'
import { useLocalStorage } from '@vueuse/core'

// eslint-disable-next-line unicorn/no-useless-undefined
export const authorizationToken = useLocalStorage<string | undefined>('token', undefined)

export const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} as Record<string, string> }) => ({
    headers: {
      ...headers,
      authorization: authorizationToken.value ? `Bearer ${authorizationToken.value}` : undefined,
    },
  }))

  return forward(operation).map(response => {
    const context = operation.getContext()

    if (context.response instanceof Response) {
      const headers = context.response.headers
      const renewToken = headers.get('X-Renew-Token')

      if (renewToken) {
        authorizationToken.value = renewToken
      }
    }

    return response
  })
})
