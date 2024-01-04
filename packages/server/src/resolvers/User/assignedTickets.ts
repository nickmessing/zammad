import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { getPaginatedTickets } from '../../utils/pagination'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { UserResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  first: zodSchemas.first,
  after: zodSchemas.datetime.optional(),
})

export const assignedTickets = (async (parent, input, { database, schema }) => {
  const { first, after } = await validateUsingSchema(inputSchema, input)

  return getPaginatedTickets(database, schema, first, after, eq(schema.tickets.assigneeId, parent.id))
}) satisfies UserResolvers['assignedTickets']
