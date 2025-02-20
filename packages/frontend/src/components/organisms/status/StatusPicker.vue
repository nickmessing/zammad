<script setup lang="ts">
import { useToggle, useVModel, onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

import StatusIndicator from '@/components/molecules/status/StatusIndicator.vue'
import { useTicketStatusesQuery } from '@/generated/graphql'

const props = withDefaults(
  defineProps<{
    ticketStatusId: string
    isDisabled?: boolean
    isNewStatusAnOption?: boolean
  }>(),
  {
    isDisabled: false,
    isNewStatusAnOption: false,
  },
)
const emit = defineEmits<{
  'update:ticketStatusId': [ticketStatusId: string]
}>()
const ticketStatusId = useVModel(props, 'ticketStatusId', emit)
const [isPickerOpen, togglePickerOpen] = useToggle(false)

const container = ref<HTMLDivElement>()

const { result: ticketStatusesQueryResult } = useTicketStatusesQuery()
const activeStatus = computed(() => {
  if (!ticketStatusesQueryResult.value?.ticketStatuses) {
    return
  }

  return ticketStatusesQueryResult.value.ticketStatuses.find(status => status.id === ticketStatusId.value)
})
const orderedTicketStatuses = computed(() => {
  if (!ticketStatusesQueryResult.value?.ticketStatuses) {
    return []
  }

  return ticketStatusesQueryResult.value.ticketStatuses.toSorted((a, b) => a.order - b.order)
})

function handleIndicatorClick() {
  if (props.isDisabled) {
    return
  }

  togglePickerOpen()
}
function handleOptionClick(newTicketStatusId: string) {
  ticketStatusId.value = newTicketStatusId
  togglePickerOpen(false)
}

onClickOutside(container, () => {
  togglePickerOpen(false)
})
</script>

<template>
  <div v-if="ticketStatusesQueryResult?.ticketStatuses" ref="container" class="relative w-full">
    <div
      :class="{
        'cursor-pointer': !props.isDisabled,
      }"
      class="flex flex-row items-center justify-start rounded-md border border-transparent p-2 hover:border-blue-300 active:border-blue-400"
      @click="handleIndicatorClick"
    >
      <StatusIndicator v-if="activeStatus" :status="activeStatus" />
    </div>
    <div v-if="isPickerOpen" class="absolute z-10 mt-2 w-full rounded-md bg-white">
      <div
        v-for="ticketStatus in orderedTicketStatuses"
        :key="ticketStatus.id"
        :class="{
          'border-blue-500': ticketStatus.id === ticketStatusId,
          'border-transparent': ticketStatus.id !== ticketStatusId,
        }"
        class="flex cursor-pointer flex-row items-center justify-start rounded-md border bg-white p-2 hover:border-blue-300 active:border-blue-400"
        @click="() => handleOptionClick(ticketStatus.id)"
      >
        <StatusIndicator :status="ticketStatus" />
      </div>
      <div
        v-if="props.isNewStatusAnOption"
        class="flex cursor-pointer flex-row items-center justify-start rounded-md border border-transparent bg-white p-2 hover:border-blue-300 active:border-blue-400"
        @click="() => handleOptionClick('new')"
      >
        Create new status
      </div>
    </div>
  </div>
</template>
