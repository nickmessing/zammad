import { eq } from 'drizzle-orm'

import type { TicketResolvers } from '../../generated/graphql'

export const author = (async (parent, _, { database, schema }) => {
  const [user] = await database.select().from(schema.users).where(eq(schema.users.id, parent.authorId)).limit(1)

  return user
}) satisfies TicketResolvers['author']
