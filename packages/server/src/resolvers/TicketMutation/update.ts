import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { TicketMutationResolvers } from '../../generated/graphql'
import type { PgUpdateSetSource } from 'drizzle-orm/pg-core'

const inputSchema = z.object({
  input: z.object({
    title: zodSchemas.ticket.title.optional(),
    description: z.string().optional(),
    statusId: z.union([zodSchemas.id, z.literal('')]).optional(),
  }),
})

export const update = (async (parent, input, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const { input: updateTicketInput } = await validateUsingSchema(inputSchema, input)

  const updatePayload: PgUpdateSetSource<typeof schema.tickets> = {}

  if (updateTicketInput.title != undefined && updateTicketInput.title !== parent.title) {
    updatePayload.title = updateTicketInput.title
  }
  if (updateTicketInput.description != undefined && updateTicketInput.description !== parent.description) {
    updatePayload.description = updateTicketInput.description
  }
  if (updateTicketInput.statusId != undefined && updateTicketInput.statusId !== parent.statusId) {
    updatePayload.statusId = updateTicketInput.statusId
  }

  if (Object.keys(updatePayload).length === 0) {
    return parent
  }

  const [ticket] = await database
    .update(schema.tickets)
    .set({
      ...updatePayload,
      updatedAt: new Date(),
    })
    .where(eq(schema.tickets.id, parent.id))
    .returning()

  return ticket
}) satisfies TicketMutationResolvers['update']
