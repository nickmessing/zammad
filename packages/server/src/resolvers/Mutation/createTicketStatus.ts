import { z } from 'zod'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { MutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  input: z.object({
    id: zodSchemas.id,
    name: zodSchemas.ticketStatus.name,
    description: zodSchemas.ticketStatus.description,
    colorBase: zodSchemas.colorBase,
    order: zodSchemas.order,
  }),
})

export const createTicketStatus = (async (_, input, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const { input: createTicketStatusInput } = await validateUsingSchema(inputSchema, input)

  const [ticketStatus] = await database
    .insert(schema.ticketStatuses)
    .values({
      id: createTicketStatusInput.id,
      name: createTicketStatusInput.name,
      description: createTicketStatusInput.description,
      colorHue: createTicketStatusInput.colorBase.hue,
      colorSaturation: createTicketStatusInput.colorBase.saturation,
      order: createTicketStatusInput.order,
    })
    .returning()

  return ticketStatus
}) satisfies MutationResolvers['createTicketStatus']
