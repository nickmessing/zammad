import { createHttpLink } from '@apollo/client/core'

export const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})
