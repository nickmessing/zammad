import type { QueryResolvers } from '../../generated/graphql'

export const ticketStatuses = (async (_, __, { database, schema }) => {
  return await database.query.ticketStatuses.findMany({
    orderBy: schema.ticketStatuses.order,
  })
}) satisfies QueryResolvers['ticketStatuses']
