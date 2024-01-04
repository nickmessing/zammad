import { desc, eq } from 'drizzle-orm'
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
    const orders = await database
      .select({ order: schema.ticketStatuses.order })
      .from(schema.ticketStatuses)
      .orderBy(desc(schema.ticketStatuses.order))
      .limit(1)
    const largestOrder = orders[0]?.order ?? 0

    const newOrder = Math.min(updateTicketStatusInput.order, largestOrder)
    const oldOrder = parent.order
    const isNewOrderBigger = newOrder > oldOrder

    if (isNewOrderBigger) {
      const ticketStatusesToUpdateOrder = await database.query.ticketStatuses.findMany({
        where: (ticketStatuses, { gt, lte, and }) =>
          and(gt(ticketStatuses.order, oldOrder), lte(ticketStatuses.order, newOrder)),
      })
      await Promise.all(
        ticketStatusesToUpdateOrder.map(ticketStatusToUpdateOrder =>
          database
            .update(schema.ticketStatuses)
            .set({
              order: ticketStatusToUpdateOrder.order - 1,
              updatedAt: new Date(),
            })
            .where(eq(schema.ticketStatuses.id, ticketStatusToUpdateOrder.id)),
        ),
      )
    } else {
      const ticketStatusesToUpdateOrder = await database.query.ticketStatuses.findMany({
        where: (ticketStatuses, { lt, gte, and }) =>
          and(lt(ticketStatuses.order, oldOrder), gte(ticketStatuses.order, newOrder)),
      })
      await Promise.all(
        ticketStatusesToUpdateOrder.map(ticketStatusToUpdateOrder =>
          database
            .update(schema.ticketStatuses)
            .set({
              order: ticketStatusToUpdateOrder.order + 1,
              updatedAt: new Date(),
            })
            .where(eq(schema.ticketStatuses.id, ticketStatusToUpdateOrder.id)),
        ),
      )
    }

    updatePayload.order = newOrder
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
