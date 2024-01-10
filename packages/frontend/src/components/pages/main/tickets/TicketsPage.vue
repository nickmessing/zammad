<script setup lang="ts">
import { computed } from 'vue'

import NewStatusColumn from '@/components/organisms/status/NewStatusColumn.vue'
import StatusTicketsColumn from '@/components/organisms/status/StatusTicketsColumn.vue'
import HorizontalScrollableLayout from '@/components/templates/HorizontalScrollableLayout.vue'
import { useTicketStatusesQuery } from '@/generated/graphql'

const { result: ticketStatusesFullQueryResult } = useTicketStatusesQuery()

const nextStatusOrder = computed(() => {
  const ticketStatuses = ticketStatusesFullQueryResult.value?.ticketStatuses
  if (!ticketStatuses) {
    return 0
  }

  return Math.max(...ticketStatuses.map(ticketStatus => ticketStatus.order), 0) + 1
})
</script>

<template>
  <HorizontalScrollableLayout>
    <StatusTicketsColumn
      v-for="ticketStatus in ticketStatusesFullQueryResult?.ticketStatuses"
      :key="ticketStatus.id"
      :ticketStatusId="ticketStatus.id"
    />
    <NewStatusColumn :nextStatusOrder="nextStatusOrder" />
  </HorizontalScrollableLayout>
</template>
