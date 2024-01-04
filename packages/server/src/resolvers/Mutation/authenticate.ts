import { createId } from '@paralleldrive/cuid2'
import { z } from 'zod'

import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { MutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  username: zodSchemas.username,
})

export const authenticate = (async (_, input, { database, schema }) => {
  const { username } = await validateUsingSchema(inputSchema, input)

  const existingUser = await database.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })

  if (existingUser) {
    return existingUser
  }

  const [createdUser] = await database
    .insert(schema.users)
    .values({
      id: createId(),
      username,
      displayName: username,
    })
    .returning()

  return createdUser
}) satisfies MutationResolvers['authenticate']
