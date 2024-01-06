<script setup lang="ts">
import Heading from '@/components/atoms/common/Heading.vue'
import { useTicketQuery } from '@/generated/graphql'

import StatusIndicator from './StatusIndicator.vue'
import TicketStatusCard from './TicketStatusCard.vue'

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
    <StatusIndicator :ticketStatusId="result.ticket.status.id" />
  </TicketStatusCard>
</template>
