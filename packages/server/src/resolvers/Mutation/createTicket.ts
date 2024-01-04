import { z } from 'zod'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { MutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  input: z.object({
    id: zodSchemas.id,
    title: zodSchemas.ticket.title,
    description: z.string(),
    statusId: zodSchemas.id,
  }),
})

export const createTicket = (async (_, input, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const { input: createTicketInput } = await validateUsingSchema(inputSchema, input)

  const [ticket] = await database
    .insert(schema.tickets)
    .values({
      id: createTicketInput.id,
      title: createTicketInput.title,
      description: createTicketInput.description,
      statusId: createTicketInput.statusId,
      authorId: tokenInfo.sub,
    })
    .returning()

  return ticket
}) satisfies MutationResolvers['createTicket']
