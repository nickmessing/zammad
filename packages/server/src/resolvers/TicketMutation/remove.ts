import { eq } from 'drizzle-orm'

import { assertUserIsAuthenticated } from '../../utils/assertions'

import type { TicketMutationResolvers } from '../../generated/graphql'

export const remove = (async (parent, _, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  await database.delete(schema.tickets).where(eq(schema.tickets.id, parent.id))

  return true
}) satisfies TicketMutationResolvers['remove']
