import { z } from 'zod'

import { zodSchemas, validateUsingSchema } from '../../utils/validate'

import type { QueryResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  id: zodSchemas.id,
})

export const user = (async (_, input, { database }) => {
  const { id } = await validateUsingSchema(inputSchema, input)

  return await database.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  })
}) satisfies QueryResolvers['user']
