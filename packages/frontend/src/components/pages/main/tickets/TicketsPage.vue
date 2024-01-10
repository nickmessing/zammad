<script setup lang="ts">
import { computedEager, useScroll } from '@vueuse/core'
import { computed, ref } from 'vue'

import NewStatusColumn from '@/components/organisms/status/NewStatusColumn.vue'
import StatusTicketsColumn from '@/components/organisms/status/StatusTicketsColumn.vue'
import HorizontalScrollableLayout from '@/components/templates/HorizontalScrollableLayout.vue'
import { useTicketStatusesQuery, useUpdateStatusesOrderMutation } from '@/generated/graphql'

import type { Coordinates } from '@/types/common'

// Would be better to get these values from the CSS, or sync somehow, but I'm too lazy to do that today.
const COLUMN_WIDTH = 384
const COLUMN_GAP = 32
const LATERAL_SPACING = 32

const layoutReference = ref<{ element: HTMLDivElement }>()
const { x } = useScroll(() => layoutReference.value?.element)

const { result: ticketStatusesFullQueryResult } = useTicketStatusesQuery()
const { mutate: updateStatusesOrder } = useUpdateStatusesOrderMutation({
  optimisticResponse: variables => ({
    updateStatusesOrder: orderedStatuses.value
      .toSorted((a, b) => {
        const orderA = variables.ids.indexOf(a.id)
        const orderB = variables.ids.indexOf(b.id)

        return orderA - orderB
      })
      .map((status, index) => ({
        ...status,
        order: index,
      })),
  }),
})

const orderedStatuses = computed(
  () => ticketStatusesFullQueryResult.value?.ticketStatuses.toSorted((a, b) => a.order - b.order) ?? [],
)

const nextStatusOrder = computed(() => {
  const ticketStatuses = orderedStatuses.value
  if (ticketStatuses.length === 0) {
    return 0
  }

  return (orderedStatuses.value.at(-1)?.order ?? 0) + 1
})

const draggingStatusId = ref<string>()
const currentMouseCoordinates = ref<Coordinates>()

// "Space" is the space between two columns.
const targetSpaceIndex = computedEager(() => {
  if (draggingStatusId.value == undefined || currentMouseCoordinates.value == undefined) {
    return
  }

  const totalLeft = x.value - LATERAL_SPACING + currentMouseCoordinates.value.x

  return Math.floor((totalLeft + COLUMN_WIDTH / 2) / (COLUMN_WIDTH + COLUMN_GAP))
})

function handleDragDocumentMouseMove(event: MouseEvent) {
  if (draggingStatusId.value == undefined) {
    return
  }

  currentMouseCoordinates.value = { x: event.clientX, y: event.clientY }
}
function handleDragDocumentMouseUp() {
  const draggingStatus = orderedStatuses.value.find(status => status.id === draggingStatusId.value)
  if (targetSpaceIndex.value != undefined && draggingStatus != undefined) {
    const listWithoutOrderingStatus = orderedStatuses.value.filter(status => status.id !== draggingStatusId.value)
    const temporarilyModifiedStatus = {
      ...draggingStatus,
      order: targetSpaceIndex.value - 0.5,
    }
    const listWithOrderingStatus = [...listWithoutOrderingStatus, temporarilyModifiedStatus].toSorted(
      (a, b) => a.order - b.order,
    )
    void updateStatusesOrder({
      ids: listWithOrderingStatus.map(status => status.id),
    })
  }

  draggingStatusId.value = undefined

  document.removeEventListener('mousemove', handleDragDocumentMouseMove)
  document.removeEventListener('mouseup', handleDragDocumentMouseUp)
}

function handleDragStart(event: MouseEvent, statusId: string) {
  draggingStatusId.value = statusId

  currentMouseCoordinates.value = { x: event.clientX, y: event.clientY }

  document.addEventListener('mousemove', handleDragDocumentMouseMove)
  document.addEventListener('mouseup', handleDragDocumentMouseUp)
}
</script>

<template>
  <HorizontalScrollableLayout ref="layoutReference">
    <StatusTicketsColumn
      v-for="(ticketStatus, index) in orderedStatuses"
      :key="ticketStatus.id"
      :isDragging="draggingStatusId === ticketStatus.id"
      :ticketStatusId="ticketStatus.id"
      :mouseCoordinates="currentMouseCoordinates"
      :isDroppingToTheLeft="index === targetSpaceIndex"
      :isDroppingToTheRight="index + 1 === targetSpaceIndex"
      @dragStart="event => handleDragStart(event, ticketStatus.id)"
    />
    <NewStatusColumn :nextStatusOrder="nextStatusOrder" />
  </HorizontalScrollableLayout>
</template>
