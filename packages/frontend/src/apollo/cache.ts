import { InMemoryCache, type Reference } from '@apollo/client/core'

import { type TicketConnection } from '@/generated/graphql'

const haveIdenticalIds = (a: Reference, b: Reference) => a.__ref === b.__ref

type TicketConnectionWithReferences = Omit<TicketConnection, 'items'> & {
  items: Reference[]
}

export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        assignedTickets: {
          keyArgs: false,
          merge(existing: TicketConnectionWithReferences | undefined, incoming: TicketConnectionWithReferences) {
            return {
              ...existing,
              ...incoming,
              items: [...(existing?.items ?? []), ...incoming.items],
            }
          },
        },
        createdTickets: {
          keyArgs: false,
          merge(existing: TicketConnectionWithReferences | undefined, incoming: TicketConnectionWithReferences) {
            return {
              ...existing,
              ...incoming,
              items: [...(existing?.items ?? []), ...incoming.items],
            }
          },
        },
      },
    },
    TicketStatus: {
      fields: {
        tickets: {
          keyArgs: false,
          merge(existing: TicketConnectionWithReferences | undefined, incoming: TicketConnectionWithReferences) {
            return {
              ...existing,
              ...incoming,
              items: [
                ...(existing?.items ?? []).filter(
                  item => !incoming.items.some(incomingItem => haveIdenticalIds(item, incomingItem)),
                ),
                ...incoming.items,
              ],
            }
          },
        },
      },
    },
  },
})
