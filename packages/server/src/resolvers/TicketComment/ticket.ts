import { eq } from 'drizzle-orm'

import type { TicketCommentResolvers } from '../../generated/graphql'

export const ticket = (async (parent, _, { database, schema }) => {
  const [ticket] = await database.select().from(schema.tickets).where(eq(schema.tickets.id, parent.ticketId)).limit(1)

  return ticket
}) satisfies TicketCommentResolvers['ticket']
