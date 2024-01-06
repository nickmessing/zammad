<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useTicketQuery, useTicketStatusBaseQuery } from '@/generated/graphql'

const props = defineProps<{
  ticketId: string
}>()
defineSlots<{
  default(): unknown
}>()

const { result: ticketQueryResult } = useTicketQuery(() => ({
  ticketId: props.ticketId,
}))
const { result: ticketStatusBaseQueryResult } = useTicketStatusBaseQuery(() => ({
  ticketStatusId: ticketQueryResult.value?.ticket?.status.id ?? '',
}))

const hue = computed(() => ticketStatusBaseQueryResult.value?.ticketStatus?.colorBase.hue ?? 0)
const saturation = computed(() => ticketStatusBaseQueryResult.value?.ticketStatus?.colorBase.saturation ?? 0)
</script>

<template>
  <RouterLink
    v-if="ticketQueryResult?.ticket"
    :to="{ name: 'Ticket', params: { id: ticketQueryResult.ticket.id } }"
    class="ticket-status-card flex flex-col gap-2 rounded border-2 bg-gray-50 p-2 text-left transition-colors"
  >
    <slot />
  </RouterLink>
</template>

<style scoped lang="less">
.ticket-status-card {
  --hue: v-bind(hue);
  --saturation: v-bind(saturation);
  --lightness: 50%;

  border-color: hsl(calc(var(--hue) * 1deg), calc(var(--saturation) * 1%), var(--lightness));

  &:hover {
    --lightness: 70%;
  }

  &:active {
    --lightness: 30%;
  }
}
</style>
