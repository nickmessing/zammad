import { GraphQLError } from 'graphql'
import { z } from 'zod'

import { errorMessages, validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { MutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  id: zodSchemas.id,
})

export const ticket = (async (_, input, { database }) => {
  const { id } = await validateUsingSchema(inputSchema, input)

  const ticket = await database.query.tickets.findFirst({
    where: (tickets, { eq }) => eq(tickets.id, id),
  })

  if (!ticket) {
    throw new GraphQLError(errorMessages.notFound('Ticket'), {
      extensions: { code: 'NOT_FOUND' },
    })
  }

  return ticket
}) satisfies MutationResolvers['ticket']
