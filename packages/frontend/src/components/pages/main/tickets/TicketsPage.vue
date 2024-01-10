<script setup lang="ts">
import StatusTicketsColumn from '@/components/organisms/status/StatusTicketsColumn.vue'
import HorizontalScrollableLayout from '@/components/templates/HorizontalScrollableLayout.vue'
import { useTicketStatusesQuery } from '@/generated/graphql'

const { result: ticketStatusesFullQueryResult } = useTicketStatusesQuery()
</script>

<template>
  <HorizontalScrollableLayout>
    <StatusTicketsColumn
      v-for="ticketStatus in ticketStatusesFullQueryResult?.ticketStatuses"
      :key="ticketStatus.id"
      :ticketStatusId="ticketStatus.id"
    />
  </HorizontalScrollableLayout>
</template>
