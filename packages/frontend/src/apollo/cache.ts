import { InMemoryCache } from '@apollo/client/core'

import type { TicketConnection } from '@/generated/graphql'

export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        assignedTickets: {
          keyArgs: false,
          merge(existing: TicketConnection | undefined, incoming: TicketConnection) {
            return {
              ...existing,
              ...incoming,
              items: [...(existing?.items ?? []), ...incoming.items],
            }
          },
        },
        createdTickets: {
          keyArgs: false,
          merge(existing: TicketConnection | undefined, incoming: TicketConnection) {
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
          merge(existing: TicketConnection | undefined, incoming: TicketConnection) {
            return {
              ...existing,
              ...incoming,
              items: [...(existing?.items ?? []), ...incoming.items],
            }
          },
        },
      },
    },
  },
})
