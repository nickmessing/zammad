import { eq } from 'drizzle-orm'

import type { TicketResolvers } from '../../generated/graphql'

export const status = (async (parent, _, { database, schema }) => {
  const [ticketStatus] = await database
    .select()
    .from(schema.ticketStatuses)
    .where(eq(schema.ticketStatuses.id, parent.statusId))
    .limit(1)

  return ticketStatus
}) satisfies TicketResolvers['status']
