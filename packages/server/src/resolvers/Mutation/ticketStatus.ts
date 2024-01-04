import { GraphQLError } from 'graphql'
import { z } from 'zod'

import { errorMessages, validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { MutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  id: zodSchemas.id,
})

export const ticketStatus = (async (_, input, { database }) => {
  const { id } = await validateUsingSchema(inputSchema, input)

  const ticketStatus = await database.query.ticketStatuses.findFirst({
    where: (ticketStatuses, { eq }) => eq(ticketStatuses.id, id),
  })

  if (!ticketStatus) {
    throw new GraphQLError(errorMessages.notFound('Ticket status'), {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  return ticketStatus
}) satisfies MutationResolvers['ticketStatus']
