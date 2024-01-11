import { createId } from '@paralleldrive/cuid2'

import {
  useCreateTicketStatusMutation,
  type TicketStatusesQuery,
  type TicketStatusesQueryVariables,
  TicketStatusesDocument,
  type TicketStatusQuery,
  type TicketStatusQueryVariables,
  TicketStatusDocument,
} from '@/generated/graphql'

export type CreateTicketStatusOptions = {
  nextStatusOrder: number
}

export function useCreateTicketStatus() {
  const { mutate } = useCreateTicketStatusMutation({
    optimisticResponse: variables => ({
      createTicketStatus: {
        __typename: 'TicketStatus',
        ...variables.input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
    update(cache, { data }) {
      if (data?.createTicketStatus == undefined) {
        return
      }

      cache.updateQuery<TicketStatusesQuery, TicketStatusesQueryVariables>(
        { query: TicketStatusesDocument },
        queryData => ({
          ...queryData,
          ticketStatuses: [
            ...(queryData?.ticketStatuses ?? []).filter(ticketStatus => ticketStatus.id !== data.createTicketStatus.id),
            data.createTicketStatus,
          ],
        }),
      )

      cache.updateQuery<TicketStatusQuery, TicketStatusQueryVariables>(
        {
          query: TicketStatusDocument,
          variables: {
            ticketStatusId: data.createTicketStatus.id,
          },
        },
        queryData => ({
          ...queryData,
          ticketStatus: data.createTicketStatus,
        }),
      )
    },
  })

  function createTicketStatus(options: CreateTicketStatusOptions) {
    return mutate({
      input: {
        colorBase: {
          hue: 213,
          saturation: 97,
        },
        description: '',
        id: createId(),
        name: 'New status',
        order: options.nextStatusOrder,
      },
    })
  }

  return { createTicketStatus }
}
