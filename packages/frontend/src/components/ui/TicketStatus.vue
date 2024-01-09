<script setup lang="ts">
import { useToggle } from '@vueuse/shared'
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'

import Heading from '../atoms/common/Heading.vue'

import StatusIndicator from './StatusIndicator.vue'
import StatusIndicatorEditor from './StatusIndicatorEditor.vue'
import TicketStatusTickets from './TicketStatusTickets.vue'

const props = defineProps<{
  ticketStatusId: string
}>()

const userStore = useUserStore()
const isEditingTicketStatus = ref(false)
function toggleIsEditingTicketStatus(value?: boolean) {
  isEditingTicketStatus.value = userStore.isAuthenticated ? value ?? !isEditingTicketStatus.value : false
}
</script>

<template>
  <div class="flex w-96 shrink-0 grow-0 flex-col gap-4 rounded bg-slate-200 p-4">
    <Heading>
      <StatusIndicatorEditor
        v-if="isEditingTicketStatus"
        :ticketStatusId="props.ticketStatusId"
        @close="() => toggleIsEditingTicketStatus(false)"
      />
      <StatusIndicator
        v-else
        :ticketStatusId="props.ticketStatusId"
        :isClickable="userStore.isAuthenticated"
        @click="() => toggleIsEditingTicketStatus(true)"
      />
    </Heading>
    <TicketStatusTickets :ticketStatusId="props.ticketStatusId" />
  </div>
</template>
