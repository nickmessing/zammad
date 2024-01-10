import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { MutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  ids: z.array(zodSchemas.id),
})

export const updateStatusesOrder = (async (_, input, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const { ids } = await validateUsingSchema(inputSchema, input)

  return Promise.all(
    ids.map(async (id, index) => {
      const [result] = await database
        .update(schema.ticketStatuses)
        .set({
          order: index,
          updatedAt: new Date(),
        })
        .where(eq(schema.ticketStatuses.id, id))
        .returning()
      return result
    }),
  )
}) satisfies MutationResolvers['updateStatusesOrder']
