import { desc, eq } from 'drizzle-orm'
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

  const largestOrderTicketStatusList = await database
    .select({ order: schema.ticketStatuses.order })
    .from(schema.ticketStatuses)
    .orderBy(desc(schema.ticketStatuses.order))
    .limit(1)

  const largestOrder = largestOrderTicketStatusList[0]?.order ?? 0

  const newOrder = Math.min(createTicketStatusInput.order, largestOrder + 1)

  const ticketStatusesToUpdateOrder = await database.query.ticketStatuses.findMany({
    where: (ticketStatuses, { gte }) => gte(ticketStatuses.order, newOrder),
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

  const [ticketStatus] = await database
    .insert(schema.ticketStatuses)
    .values({
      id: createTicketStatusInput.id,
      name: createTicketStatusInput.name,
      description: createTicketStatusInput.description,
      colorHue: createTicketStatusInput.colorBase.hue,
      colorSaturation: createTicketStatusInput.colorBase.saturation,
      order: newOrder,
    })
    .returning()

  return ticketStatus
}) satisfies MutationResolvers['createTicketStatus']
