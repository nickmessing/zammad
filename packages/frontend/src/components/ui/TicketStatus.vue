<script setup lang="ts">
import Heading from '../atoms/common/Heading.vue'

import StatusIndicator from './StatusIndicator.vue'
import TicketStatusTickets from './TicketStatusTickets.vue'

const props = defineProps<{
  ticketStatusId: string
}>()
</script>

<template>
  <div class="flex w-96 shrink-0 grow-0 flex-col gap-4 rounded bg-slate-200 p-4">
    <Heading>
      <StatusIndicator :ticketStatusId="props.ticketStatusId" />
    </Heading>
    <TicketStatusTickets :ticketStatusId="props.ticketStatusId" />
  </div>
</template>
