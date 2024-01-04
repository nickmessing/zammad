import type { QueryResolvers } from '../../generated/graphql'

export const me = (async (_, __, { database, tokenInfo }) => {
  if (!tokenInfo) {
    return
  }

  return await database.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, tokenInfo.sub),
  })
}) satisfies QueryResolvers['me']
