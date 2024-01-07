import type { QueryResolvers } from '../../generated/graphql'

export const users = (async (_, __, { database }) => {
  return await database.query.users.findMany()
}) satisfies QueryResolvers['users']
