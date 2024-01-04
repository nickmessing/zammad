import { z } from 'zod'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { validateUsingSchema, zodSchemas } from '../../utils/validate'

import type { TicketMutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  input: z.object({
    id: zodSchemas.id,
    comment: z.string(),
  }),
})

export const createComment = (async (parent, input, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const { input: createCommentInput } = await validateUsingSchema(inputSchema, input)

  const [comment] = await database
    .insert(schema.ticketComments)
    .values({
      id: createCommentInput.id,
      comment: createCommentInput.comment,
      authorId: tokenInfo.sub,
      ticketId: parent.id,
    })
    .returning()

  return comment
}) satisfies TicketMutationResolvers['createComment']
