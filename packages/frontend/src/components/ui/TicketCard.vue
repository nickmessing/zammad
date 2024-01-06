<script setup lang="ts">
import { useTicketQuery } from '@/generated/graphql'

import Heading from '../atoms/common/Heading.vue'

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
