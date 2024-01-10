import { eq } from 'drizzle-orm'

import { assertUserIsAuthenticated } from '../../utils/assertions'

import type { TicketStatusMutationResolvers } from '../../generated/graphql'

export const remove = (async (parent, _, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  await database.delete(schema.ticketStatuses).where(eq(schema.ticketStatuses.id, parent.id))

  return true
}) satisfies TicketStatusMutationResolvers['remove']
