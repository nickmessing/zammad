import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { getPaginatedTickets } from '../../utils/pagination'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { TicketStatusResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  first: zodSchemas.first,
  after: zodSchemas.datetime.optional(),
})

export const tickets = (async (parent, input, { database, schema }) => {
  const { first, after } = await validateUsingSchema(inputSchema, input)

  return getPaginatedTickets(database, schema, first, after, eq(schema.tickets.statusId, parent.id))
}) satisfies TicketStatusResolvers['tickets']
