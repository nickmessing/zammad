import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { MutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  displayName: zodSchemas.displayName,
})

export const updateDisplayName = (async (_, input, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const { displayName } = await validateUsingSchema(inputSchema, input)
  const [updatedUser] = await database
    .update(schema.users)
    .set({
      displayName,
      updatedAt: new Date(),
    })
    .where(eq(schema.users.id, tokenInfo.sub))
    .returning()

  return updatedUser
}) satisfies MutationResolvers['updateDisplayName']
