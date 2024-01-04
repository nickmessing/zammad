import type { AuthenticationResponseResolvers } from '../../generated/graphql'

export const user = (parent => parent) satisfies AuthenticationResponseResolvers['user']
