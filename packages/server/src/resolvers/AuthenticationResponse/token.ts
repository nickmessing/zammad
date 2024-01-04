import { createToken } from '../../utils/jwt'

import type { AuthenticationResponseResolvers } from '../../generated/graphql'

export const token = (parent => createToken(parent)) satisfies AuthenticationResponseResolvers['token']
