<script setup lang="ts">
import { computedEager } from '@vueuse/shared'
import { computed, ref, watchEffect } from 'vue'

import { useDragReorder } from '@/components/atoms/composition/common/useDragReorder'
import { useCreateTicketStatus } from '@/components/organisms/composition/apollo/ticketStatus/useCreateTicketStatus'
import { useUpdateStatusesOrder } from '@/components/organisms/composition/apollo/ticketStatus/useUpdateStatusesOrder'
import NewStatusColumn from '@/components/organisms/status/NewStatusColumn.vue'
import StatusTicketsColumn from '@/components/organisms/status/StatusTicketsColumn.vue'
import HorizontalScrollableLayout from '@/components/templates/HorizontalScrollableLayout.vue'
import { useTicketStatusesQuery } from '@/generated/graphql'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const { result: ticketStatusesFullQueryResult } = useTicketStatusesQuery()
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

const { updateStatusesOrder } = useUpdateStatusesOrder()

const layoutReference = ref<{ element: HTMLDivElement }>()
const draggingStatusId = ref<string>()
const { onReorder, startDragging, targetSpaceIndex, currentMouseCoordinates } = useDragReorder(() => ({
  isDragging: draggingStatusId.value != undefined,
  scrollElement: layoutReference.value?.element,
}))
function handleDragStart(event: MouseEvent, statusId: string) {
  draggingStatusId.value = statusId
  startDragging(event)
}
onReorder(({ targetIndex }) => {
  const draggingStatus = orderedStatuses.value.find(status => status.id === draggingStatusId.value)

  if (draggingStatus != undefined) {
    const listWithoutOrderingStatus = orderedStatuses.value.filter(status => status.id !== draggingStatusId.value)
    const temporarilyModifiedStatus = {
      ...draggingStatus,
      order: targetIndex - 0.5,
    }
    const listWithOrderingStatus = [...listWithoutOrderingStatus, temporarilyModifiedStatus].toSorted(
      (a, b) => a.order - b.order,
    )
    void updateStatusesOrder(listWithOrderingStatus.map(status => status.id))
  }

  draggingStatusId.value = undefined
})

const activeStatusId = ref<string>()
const activeStatus = computedEager(() => orderedStatuses.value.find(status => status.id === activeStatusId.value))

watchEffect(() => {
  if (activeStatus.value == undefined && orderedStatuses.value.length > 0) {
    activeStatusId.value = orderedStatuses.value[0].id
  }
})

const { createTicketStatus } = useCreateTicketStatus()
async function handleUpdateActiveStatus(value: string) {
  if (value === 'new') {
    const result = await createTicketStatus({ nextStatusOrder: nextStatusOrder.value })
    if (result?.data?.createTicketStatus.id) {
      activeStatusId.value = result.data.createTicketStatus.id
    }
    return
  }
  activeStatusId.value = value
}
</script>

<template>
  <HorizontalScrollableLayout ref="layoutReference">
    <StatusTicketsColumn
      v-for="(ticketStatus, index) in orderedStatuses"
      :key="ticketStatus.id"
      :class="{
        hidden: ticketStatus.id !== activeStatusId,
        flex: ticketStatus.id === activeStatusId,
      }"
      :isDragging="draggingStatusId === ticketStatus.id"
      :ticketStatusId="ticketStatus.id"
      :mouseCoordinates="currentMouseCoordinates"
      :isDroppingToTheLeft="index === targetSpaceIndex"
      :isDroppingToTheRight="index + 1 === targetSpaceIndex"
      @dragStart="event => handleDragStart(event, ticketStatus.id)"
      @updateActiveStatus="handleUpdateActiveStatus"
    />
    <NewStatusColumn v-if="userStore.isAuthenticated" :nextStatusOrder="nextStatusOrder" class="hidden md:block" />
  </HorizontalScrollableLayout>
</template>
