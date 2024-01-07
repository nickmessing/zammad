<script setup lang="ts">
import { computed } from 'vue'

import { useTicketStatusBaseQuery } from '@/generated/graphql'

const props = defineProps<{
  ticketStatusId: string
}>()

const { result: ticketStatusBaseQueryResult } = useTicketStatusBaseQuery(() => ({
  ticketStatusId: props.ticketStatusId,
}))

const hue = computed(() => ticketStatusBaseQueryResult.value?.ticketStatus?.colorBase.hue ?? 0)
const saturation = computed(() => ticketStatusBaseQueryResult.value?.ticketStatus?.colorBase.saturation ?? 0)
</script>

<template>
  <div v-if="ticketStatusBaseQueryResult?.ticketStatus" class="flex flex-row items-center gap-2">
    <div class="ticket-status-indicator h-4 w-4 rounded-full border" />
    <div>
      {{ ticketStatusBaseQueryResult.ticketStatus.name }}
    </div>
  </div>
</template>

<style scoped lang="less">
.ticket-status-indicator {
  --hue: v-bind(hue);
  --saturation: v-bind(saturation);
  --lightness: 50%;

  background-color: hsl(calc(var(--hue) * 1deg), calc(var(--saturation) * 1%), var(--lightness));
  border-color: hsl(calc(var(--hue) * 1deg), calc(var(--saturation) * 1%), calc(var(--lightness) - 20%));
}
</style>
