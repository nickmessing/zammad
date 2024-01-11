<script setup lang="ts">
import { mdiDrag, mdiPencil } from '@mdi/js'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { ref } from 'vue'

import ZammadHeading from '@/components/atoms/common/ZammadHeading.vue'
import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import { useTicketStatusQuery } from '@/generated/graphql'
import { useUserStore } from '@/stores/user'

import StatusEditor from './StatusEditor.vue'
import StatusPicker from './StatusPicker.vue'
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
  updateActiveStatus: [ticketStatusId: string]
}>()

const userStore = useUserStore()
const breakpoints = useBreakpoints(breakpointsTailwind)

const isDesktop = breakpoints.greaterOrEqual('md')

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
      <StatusPicker
        :ticketStatusId="ticketStatusQueryResult.ticketStatus.id"
        :isDisabled="isDesktop"
        :isNewStatusAnOption="userStore.isAuthenticated"
        @update:ticketStatusId="value => emit('updateActiveStatus', value)"
      />
      <template v-if="userStore.isAuthenticated">
        <ZammadIcon
          :path="mdiPencil"
          class="text-gray-500"
          @mousedown.stop.prevent="() => toggleIsEditingTicketStatus(true)"
        />
        <StatusRemoval :status="ticketStatusQueryResult.ticketStatus" />
        <ZammadIcon :path="mdiDrag" class="hidden cursor-move" @mousedown.stop.prevent="handleDragIconMouseDown" />
      </template>
    </div>
  </ZammadHeading>
</template>
