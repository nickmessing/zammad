<script setup lang="ts">
import { computed, ref } from 'vue'

import ZammadButton from '@/components/atoms/common/ZammadButton.vue'
import ZammadColumn from '@/components/atoms/common/ZammadColumn.vue'
import { useCreateTicket } from '@/components/organisms/composition/apollo/ticket/useCreateTicket'
import { useUserStore } from '@/stores/user'

import StatusTicketList from './StatusTicketList.vue'
import StatusTicketsColumnHeading from './StatusTicketsColumnHeading.vue'

import type { Coordinates } from '@/types/common'

const props = defineProps<{
  ticketStatusId: string
  isDragging?: boolean
  mouseCoordinates?: Coordinates
  isDroppingToTheRight?: boolean
  isDroppingToTheLeft?: boolean
}>()
const emit = defineEmits<{
  dragStart: [event: MouseEvent]
  updateActiveStatus: [ticketStatusId: string]
}>()

const userStore = useUserStore()

const columnContainerReference = ref<HTMLDivElement>()
const offset = ref<Coordinates>()
function handleDragStart({ coordinates, event }: { coordinates: Coordinates; event: MouseEvent }) {
  if (columnContainerReference.value == undefined) {
    return
  }

  const clientRect = columnContainerReference.value.getBoundingClientRect()
  offset.value = {
    x: coordinates.x - clientRect.left,
    y: coordinates.y - clientRect.top,
  }

  emit('dragStart', event)
}
const top = computed(() => {
  if (props.mouseCoordinates == undefined || offset.value == undefined) {
    return
  }

  return props.mouseCoordinates.y - offset.value.y
})
const left = computed(() => {
  if (props.mouseCoordinates == undefined || offset.value == undefined) {
    return
  }

  return props.mouseCoordinates.x - offset.value.x
})

const { createTicket } = useCreateTicket()
</script>

<template>
  <div
    ref="columnContainerReference"
    :class="{
      'rounded bg-slate-200 p-4 shadow-xl': props.isDragging,
      '-translate-x-8': !props.isDragging && props.isDroppingToTheRight,
      'translate-x-8': !props.isDragging && props.isDroppingToTheLeft,
    }"
    class="w-full shrink-0 grow-0 transition-transform md:flex md:w-96"
  >
    <ZammadColumn
      :class="{ 'dragging absolute z-10 transform opacity-80': props.isDragging }"
      class="w-full overflow-hidden transition-opacity md:w-96"
    >
      <StatusTicketsColumnHeading
        :isDragging="props.isDragging"
        :ticketStatusId="props.ticketStatusId"
        @dragStart="handleDragStart"
        @updateActiveStatus="value => emit('updateActiveStatus', value)"
      />
      <ZammadButton v-if="userStore.isAuthenticated" @click="() => createTicket({ statusId: props.ticketStatusId })"
        >New Ticket</ZammadButton
      >
      <StatusTicketList :ticketStatusId="props.ticketStatusId" />
    </ZammadColumn>
  </div>
</template>

<style scoped lang="less">
.dragging {
  top: 0;
  left: 0;

  --tw-translate-x: calc(v-bind(left) * 1px);
  --tw-translate-y: calc(v-bind(top) * 1px);
}
</style>
