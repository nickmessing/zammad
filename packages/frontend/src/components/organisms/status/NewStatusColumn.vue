<script setup lang="ts">
import { createId } from '@paralleldrive/cuid2'

import ZammadButton from '@/components/atoms/common/ZammadButton.vue'
import ZammadColumn from '@/components/atoms/common/ZammadColumn.vue'
import {
  useCreateTicketStatusMutation,
  type TicketStatusesQuery,
  type TicketStatusesQueryVariables,
  TicketStatusesDocument,
  type TicketStatusQuery,
  type TicketStatusQueryVariables,
  TicketStatusDocument,
} from '@/generated/graphql'

const props = defineProps<{
  nextStatusOrder: number
}>()

const { mutate: createTicketStatus } = useCreateTicketStatusMutation(() => ({
  variables: {
    input: {
      colorBase: {
        hue: 213,
        saturation: 97,
      },
      description: '',
      id: createId(),
      name: 'New status',
      order: props.nextStatusOrder,
    },
  },
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
}))
</script>

<template>
  <div>
    <ZammadColumn class="w-96 shrink-0 grow-0">
      <ZammadButton theme="primary" @click="() => createTicketStatus()"> Create new status </ZammadButton>
    </ZammadColumn>
  </div>
</template>
