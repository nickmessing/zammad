import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { TicketStatusMutationResolvers } from '../../generated/graphql'
import type { PgUpdateSetSource } from 'drizzle-orm/pg-core'

const inputSchema = z.object({
  input: z.object({
    name: zodSchemas.ticketStatus.name.optional(),
    description: zodSchemas.ticketStatus.description.optional(),
    colorBase: zodSchemas.colorBase.optional(),
    order: zodSchemas.order.optional(),
  }),
})

export const update = (async (parent, input, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const { input: updateTicketStatusInput } = await validateUsingSchema(inputSchema, input)

  const updatePayload: PgUpdateSetSource<typeof schema.ticketStatuses> = {}

  if (updateTicketStatusInput.name != undefined && updateTicketStatusInput.name !== parent.name) {
    updatePayload.name = updateTicketStatusInput.name
  }
  if (updateTicketStatusInput.description != undefined && updateTicketStatusInput.description !== parent.description) {
    updatePayload.description = updateTicketStatusInput.description
  }
  if (updateTicketStatusInput.colorBase != undefined && updateTicketStatusInput.colorBase.hue !== parent.colorHue) {
    updatePayload.colorHue = updateTicketStatusInput.colorBase.hue
  }
  if (
    updateTicketStatusInput.colorBase != undefined &&
    updateTicketStatusInput.colorBase.saturation !== parent.colorSaturation
  ) {
    updatePayload.colorSaturation = updateTicketStatusInput.colorBase.saturation
  }
  if (updateTicketStatusInput.order != undefined && updateTicketStatusInput.order !== parent.order) {
    updatePayload.order = updateTicketStatusInput.order
  }

  if (Object.keys(updatePayload).length === 0) {
    return parent
  }

  const [ticketStatus] = await database
    .update(schema.ticketStatuses)
    .set({
      ...updatePayload,
      updatedAt: new Date(),
    })
    .where(eq(schema.ticketStatuses.id, parent.id))
    .returning()

  return ticketStatus
}) satisfies TicketStatusMutationResolvers['update']
