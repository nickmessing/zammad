import { z } from 'zod'

import { getPaginatedTicketComments } from '../../utils/pagination'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { TicketResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  first: zodSchemas.first,
  after: zodSchemas.datetime.optional(),
})

export const comments = (async (parent, input, { database, schema }) => {
  const { first, after } = await validateUsingSchema(inputSchema, input)

  return getPaginatedTicketComments(database, schema, parent.id, first, after)
}) satisfies TicketResolvers['comments']
