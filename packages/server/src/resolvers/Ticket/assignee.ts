import { eq } from 'drizzle-orm'

import type { TicketResolvers } from '../../generated/graphql'

export const assignee = (async (parent, _, { database, schema }) => {
  if (!parent.assigneeId) {
    return
  }

  const [assignee] = await database.select().from(schema.users).where(eq(schema.users.id, parent.assigneeId)).limit(1)

  return assignee
}) satisfies TicketResolvers['assignee']
