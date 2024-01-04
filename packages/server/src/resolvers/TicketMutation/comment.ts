import { GraphQLError } from 'graphql'
import { z } from 'zod'

import { errorMessages, validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { TicketMutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  id: zodSchemas.id,
})

export const comment = (async (parent, input, { database }) => {
  const { id } = await validateUsingSchema(inputSchema, input)

  const ticketComment = await database.query.ticketComments.findFirst({
    where: (ticketComments, { eq, and }) => and(eq(ticketComments.id, id), eq(ticketComments.ticketId, parent.id)),
  })

  if (!ticketComment) {
    throw new GraphQLError(errorMessages.notFound('Ticket comment'), {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  return ticketComment
}) satisfies TicketMutationResolvers['comment']
