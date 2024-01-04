import { eq } from 'drizzle-orm'

import { assertUserIsAuthenticated } from '../../utils/assertions'

import type { TicketStatusMutationResolvers } from '../../generated/graphql'

export const remove = (async (parent, _, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const ticketStatusesToUpdateOrder = await database.query.ticketStatuses.findMany({
    where: (ticketStatuses, { gt }) => gt(ticketStatuses.order, parent.order),
  })

  await Promise.all(
    ticketStatusesToUpdateOrder.map(ticketStatusToUpdateOrder =>
      database
        .update(schema.ticketStatuses)
        .set({
          order: ticketStatusToUpdateOrder.order - 1,
          updatedAt: new Date(),
        })
        .where(eq(schema.ticketStatuses.id, ticketStatusToUpdateOrder.id)),
    ),
  )

  await database.delete(schema.ticketStatuses).where(eq(schema.ticketStatuses.id, parent.id))

  return true
}) satisfies TicketStatusMutationResolvers['remove']
