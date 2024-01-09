<script setup lang="ts">
import TicketStatus from '@/components/ui/TicketStatus.vue'
import { useTicketStatusesQuery } from '@/generated/graphql'

const { result: ticketStatusesQueryResult } = useTicketStatusesQuery()
</script>

<template>
  <div class="flex grow flex-row gap-8 overflow-auto p-8">
    <TicketStatus
      v-for="ticketStatus in ticketStatusesQueryResult?.ticketStatuses"
      :key="ticketStatus.id"
      :ticketStatusId="ticketStatus.id"
    />
  </div>
</template>
