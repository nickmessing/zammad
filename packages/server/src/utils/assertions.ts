import { GraphQLError } from 'graphql'

import type { TokenInfo } from './jwt'

export function assertUserIsAuthenticated(tokenInfo: TokenInfo): asserts tokenInfo {
  if (!tokenInfo) {
    throw new GraphQLError(
      "Oops! Looks like you're trying to sneak into the VIP section. Please log in first so we can roll out the red carpet for you!",
      { extensions: { code: 'FORBIDDEN' } },
    )
  }
}
