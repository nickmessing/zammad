<script setup lang="ts">
import { mdiDrag } from '@mdi/js'
import { ref } from 'vue'

import ZammadHeading from '@/components/atoms/common/ZammadHeading.vue'
import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import StatusIndicator from '@/components/molecules/status/StatusIndicator.vue'
import { useTicketStatusQuery } from '@/generated/graphql'
import { useUserStore } from '@/stores/user'

import StatusEditor from './StatusEditor.vue'
import StatusRemoval from './StatusRemoval.vue'

import type { Coordinates } from '@/types/common'

const props = defineProps<{
  ticketStatusId: string
  isDragging?: boolean
}>()
const emit = defineEmits<{
  dragStart: [
    {
      coordinates: Coordinates
      event: MouseEvent
    },
  ]
}>()

const userStore = useUserStore()

const { result: ticketStatusQueryResult } = useTicketStatusQuery(() => ({
  ticketStatusId: props.ticketStatusId,
}))

const isEditingTicketStatus = ref(false)
function toggleIsEditingTicketStatus(value?: boolean) {
  isEditingTicketStatus.value = userStore.isAuthenticated ? value ?? !isEditingTicketStatus.value : false
}

function handleDragIconMouseDown(event: MouseEvent) {
  emit('dragStart', {
    event,
    coordinates: { x: event.clientX, y: event.clientY },
  })
}
</script>

<template>
  <ZammadHeading v-if="ticketStatusQueryResult?.ticketStatus">
    <StatusEditor
      v-if="isEditingTicketStatus"
      :status="ticketStatusQueryResult.ticketStatus"
      @close="() => toggleIsEditingTicketStatus(false)"
    />
    <div v-else class="flex flex-row items-center gap-2">
      <StatusIndicator
        :status="ticketStatusQueryResult.ticketStatus"
        class="grow"
        isClickable
        @click="() => toggleIsEditingTicketStatus(true)"
      />
      <template v-if="userStore.isAuthenticated">
        <StatusRemoval :status="ticketStatusQueryResult.ticketStatus" />
        <ZammadIcon :path="mdiDrag" class="cursor-move" @mousedown.stop.prevent="handleDragIconMouseDown" />
      </template>
    </div>
  </ZammadHeading>
</template>
