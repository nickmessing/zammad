import { ApolloClient } from '@apollo/client/core'

import { cache } from './cache'
import { link } from './links'

export const apolloClient = new ApolloClient({
  link,
  cache,
})
