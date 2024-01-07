<script setup lang="ts">
import Heading from '@/components/atoms/common/Heading.vue'
import { useTicketQuery } from '@/generated/graphql'

import StatusIndicator from './StatusIndicator.vue'
import TicketStatusCard from './TicketStatusCard.vue'
import UserIndicator from './UserIndicator.vue'

const props = defineProps<{
  ticketId: string
}>()

const { result } = useTicketQuery(() => ({
  ticketId: props.ticketId,
}))
</script>

<template>
  <TicketStatusCard v-if="result?.ticket" :ticketId="result.ticket.id">
    <Heading :level="3">{{ result.ticket.title }}</Heading>
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-row items-center gap-2">
        <UserIndicator v-if="result.ticket.assignee" :userId="result.ticket.assignee.id" />
      </div>
      <StatusIndicator :ticketStatusId="result.ticket.status.id" />
    </div>
  </TicketStatusCard>
</template>
