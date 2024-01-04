/// <reference types="@vueuse/shared" />
import { setContext } from '@apollo/client/link/context'
import { useLocalStorage } from '@vueuse/core'

// eslint-disable-next-line unicorn/no-useless-undefined
export const authorizationToken = useLocalStorage<string | undefined>('token', undefined)

export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...(headers as Record<string, string> | undefined),
      authorization: authorizationToken.value ? `Bearer ${authorizationToken.value}` : '',
    },
  }
})
