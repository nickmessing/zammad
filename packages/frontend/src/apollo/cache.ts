import { InMemoryCache } from '@apollo/client/core'
import { watch } from 'vue'

import { authorizationToken } from './links/authorization'

export const cache = new InMemoryCache()

watch(authorizationToken, () => {
  void cache.reset()
})
