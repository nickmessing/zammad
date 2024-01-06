import { and, count, desc, eq, lt } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

import { errorMessages } from './validate'

import type { Database, Schema } from '../bootstrap/database'
import type { SQL } from 'drizzle-orm'

export async function getPaginatedTickets(
  database: Database,
  schema: Schema,
  first: number,
  after?: string,
  whereClause?: SQL,
) {
  if (first > 100) {
    throw new GraphQLError(errorMessages.over100Items('tickets'), {
      extensions: { code: 'INVALID_INPUT' },
    })
  }

  const afterAsDate = after ? new Date(after) : undefined

  const [{ totalCount }] = await database.select({ totalCount: count() }).from(schema.tickets).where(whereClause)

  const afterWhereClause = afterAsDate ? lt(schema.tickets.createdAt, afterAsDate) : undefined
  const combinedWhereClause = and(whereClause, afterWhereClause)

  const [{ countAfter }] = await database
    .select({ countAfter: count() })
    .from(schema.tickets)
    .where(combinedWhereClause)

  const items = await database
    .select()
    .from(schema.tickets)
    .where(combinedWhereClause)
    .orderBy(desc(schema.tickets.createdAt))
    .limit(first)

  const endCursor = countAfter > first ? items.at(-1)?.createdAt.toISOString() : undefined

  return { totalCount, items, endCursor }
}

export async function getPaginatedTicketComments(
  database: Database,
  schema: Schema,
  ticketId: string,
  first: number,
  after?: string,
  whereClause?: SQL,
) {
  if (first > 100) {
    throw new GraphQLError(errorMessages.over100Items('comments'), {
      extensions: { code: 'INVALID_INPUT' },
    })
  }

  const afterAsDate = after ? new Date(after) : undefined

  const basicWhereClause = and(whereClause, eq(schema.ticketComments.ticketId, ticketId))

  const [{ totalCount }] = await database
    .select({ totalCount: count() })
    .from(schema.ticketComments)
    .where(basicWhereClause)

  const afterWhereClause = afterAsDate ? lt(schema.ticketComments.createdAt, afterAsDate) : undefined
  const combinedWhereClause = and(afterWhereClause, basicWhereClause)

  const [{ countAfter }] = await database
    .select({ countAfter: count() })
    .from(schema.ticketComments)
    .where(combinedWhereClause)

  const items = await database
    .select()
    .from(schema.ticketComments)
    .where(combinedWhereClause)
    .orderBy(desc(schema.ticketComments.createdAt))
    .limit(first)

  const endCursor = countAfter > first ? items.at(-1)?.createdAt.toISOString() : undefined

  return { totalCount, items, endCursor }
}
