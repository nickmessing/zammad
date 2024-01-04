import { z } from 'zod'

import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { QueryResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  id: zodSchemas.id,
})

export const ticket = (async (_, input, { database }) => {
  const { id } = await validateUsingSchema(inputSchema, input)

  return await database.query.tickets.findFirst({
    where: (tickets, { eq }) => eq(tickets.id, id),
  })
}) satisfies QueryResolvers['ticket']
