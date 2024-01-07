<script setup lang="ts">
import { useToggle, useVModel, onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useTicketStatusesQuery } from '@/generated/graphql'

import StatusIndicator from './StatusIndicator.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    isDisabled?: boolean
  }>(),
  {
    isDisabled: false,
  },
)
const emit = defineEmits<{
  'update:modelValue': [modelValue: string]
}>()
const modelValue = useVModel(props, 'modelValue', emit)
const [isPickerOpen, togglePickerOpen] = useToggle(false)

const container = ref<HTMLDivElement>()

const { result: ticketStatusesQueryResult } = useTicketStatusesQuery()
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
function handleOptionClick(ticketStatusId: string) {
  modelValue.value = ticketStatusId
  togglePickerOpen(false)
}

onClickOutside(container, () => {
  togglePickerOpen(false)
})
</script>

<template>
  <div v-if="ticketStatusesQueryResult?.ticketStatuses" ref="container" class="relative h-10 w-full">
    <div
      :class="{
        'cursor-not-allowed bg-gray-200': props.isDisabled,
      }"
      class="flex cursor-pointer flex-row items-center justify-start rounded-md border border-transparent bg-white p-2 hover:border-blue-300 active:border-blue-400"
      @click="handleIndicatorClick"
    >
      <StatusIndicator :ticketStatusId="modelValue" />
    </div>
    <div v-if="isPickerOpen" class="absolute mt-2 w-full rounded-md bg-white">
      <div
        v-for="ticketStatus in orderedTicketStatuses"
        :key="ticketStatus.id"
        :class="{
          'border-blue-500': ticketStatus.id === modelValue,
          'border-transparent': ticketStatus.id !== modelValue,
        }"
        class="flex cursor-pointer flex-row items-center justify-start rounded-md border bg-white p-2 hover:border-blue-300 active:border-blue-400"
        @click="() => handleOptionClick(ticketStatus.id)"
      >
        <StatusIndicator :ticketStatusId="ticketStatus.id" />
      </div>
    </div>
  </div>
</template>
