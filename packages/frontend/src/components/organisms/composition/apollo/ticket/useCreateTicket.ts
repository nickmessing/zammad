import { createId } from '@paralleldrive/cuid2'

import {
  useCreateTicketMutation,
  useTicketStatusesQuery,
  type TicketStatusTicketsQuery,
  type TicketStatusTicketsQueryVariables,
  TicketStatusTicketsDocument,
} from '@/generated/graphql'
import { useUserStore } from '@/stores/user'
import { TICKETS_PER_PAGE } from '@/utils/constants'

export type CreateTicketOptions = {
  title?: string
  description?: string
  statusId: string
}

export function useCreateTicket() {
  const userStore = useUserStore()
  const { result: ticketStatusesQueryResult } = useTicketStatusesQuery()

  const { mutate } = useCreateTicketMutation({
    optimisticResponse: variables => ({
      createTicket: {
        __typename: 'Ticket',
        ...variables.input,
        author: userStore.user!,
        // eslint-disable-next-line unicorn/no-null
        assignee: null,
        status: ticketStatusesQueryResult.value!.ticketStatuses.find(status => status.id === variables.input.statusId)!,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
    update(cache, { data }) {
      if (data?.createTicket == undefined) {
        return
      }

      cache.updateQuery<TicketStatusTicketsQuery, TicketStatusTicketsQueryVariables>(
        {
          query: TicketStatusTicketsDocument,
          variables: { ticketStatusId: data.createTicket.status.id, first: TICKETS_PER_PAGE },
        },
        queryData => {
          const result = queryData?.ticketStatus?.tickets
            ? {
                ...queryData,
                ticketStatus: {
                  ...queryData.ticketStatus,
                  tickets: {
                    ...queryData.ticketStatus.tickets,
                    totalCount: queryData.ticketStatus.tickets.totalCount + 1,
                    items: [
                      data.createTicket,
                      ...queryData.ticketStatus.tickets.items.filter(ticket => ticket.id !== data.createTicket.id),
                    ],
                  },
                },
              }
            : undefined
          console.log({
            queryData,
            result,
          })

          return result
        },
      )
    },
  })

  function createTicket(options: CreateTicketOptions) {
    return mutate({
      input: {
        id: createId(),
        title: options.title ?? 'New ticket',
        description: options.description ?? '',
        statusId: options.statusId,
      },
    })
  }

  return { createTicket }
}
