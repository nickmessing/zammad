import { z } from 'zod'

import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { QueryResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  id: zodSchemas.id,
})

export const ticketStatus = (async (_, input, { database }) => {
  const { id } = await validateUsingSchema(inputSchema, input)

  return await database.query.ticketStatuses.findFirst({
    where: (ticketStatuses, { eq }) => eq(ticketStatuses.id, id),
  })
}) satisfies QueryResolvers['ticketStatus']
