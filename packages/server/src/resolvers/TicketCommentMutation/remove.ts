import { eq } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

import { assertUserIsAuthenticated } from '../../utils/assertions'
import { errorMessages } from '../../utils/validate'

import type { TicketCommentMutationResolvers } from '../../generated/graphql'

export const remove = (async (parent, _, { database, schema, tokenInfo }) => {
  assertUserIsAuthenticated(tokenInfo)

  if (parent.authorId !== tokenInfo.sub) {
    throw new GraphQLError(errorMessages.forbidden, {
      extensions: { code: 'FORBIDDEN' },
    })
  }

  await database.delete(schema.ticketComments).where(eq(schema.ticketComments.id, parent.id))

  return parent.id
}) satisfies TicketCommentMutationResolvers['remove']
