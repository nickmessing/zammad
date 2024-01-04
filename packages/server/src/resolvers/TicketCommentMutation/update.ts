import { eq } from 'drizzle-orm'
import { GraphQLError } from 'graphql'
import { z } from 'zod'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { errorMessages, validateUsingSchema } from '../../utils/validate'

import type { TicketCommentMutationResolvers } from '../../generated/graphql'

const inputSchema = z.object({
  comment: z.string().optional(),
})

export const update = (async (parent, input, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  const { comment: newCommentMessage } = await validateUsingSchema(inputSchema, input)

  if (parent.authorId !== tokenInfo.sub) {
    throw new GraphQLError(errorMessages.forbidden, {
      extensions: { code: 'FORBIDDEN' },
    })
  }

  const [ticketComment] = await database
    .update(schema.ticketComments)
    .set({
      comment: newCommentMessage,
      updatedAt: new Date(),
    })
    .where(eq(schema.ticketComments.id, parent.id))
    .returning()

  return ticketComment
}) satisfies TicketCommentMutationResolvers['update']
