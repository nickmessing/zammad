import {
  useRemoveTicketStatusMutation,
  type TicketStatusesQuery,
  type TicketStatusesQueryVariables,
  TicketStatusesDocument,
} from '@/generated/graphql'

export function useRemoveTicketStatus() {
  const { mutate } = useRemoveTicketStatusMutation({
    optimisticResponse: variables => ({
      ticketStatus: {
        remove: variables.ticketStatusId,
      },
    }),
    update(cache, { data }) {
      if (data?.ticketStatus.remove == undefined) {
        return
      }

      cache.updateQuery<TicketStatusesQuery, TicketStatusesQueryVariables>(
        { query: TicketStatusesDocument },
        queryData => ({
          ...queryData,
          ticketStatuses: (queryData?.ticketStatuses ?? []).filter(
            ticketStatus => ticketStatus.id !== data.ticketStatus.remove,
          ),
        }),
      )

      cache.evict({
        id: cache.identify({
          __typename: 'TicketStatus',
          id: data.ticketStatus.remove,
        }),
      })
    },
  })

  function removeTicketStatus(ticketStatusId: string) {
    return mutate({
      ticketStatusId,
    })
  }

  return { removeTicketStatus }
}
