<script setup lang="ts">
import { refDebounced } from '@vueuse/shared'
import { computed, ref } from 'vue'

import {
  useTicketStatusBaseQuery,
  type ColorBase,
  useUpdateTicketStatusMutation,
  type UpdateTicketStatusInput,
} from '@/generated/graphql'

import Button from '../atoms/common/Button.vue'
import ColorPicker from '../atoms/forms/ColorPicker.vue'
import TextInput from '../atoms/forms/TextInput.vue'

const props = defineProps<{
  ticketStatusId: string
}>()
const emit = defineEmits<{
  click: [event: MouseEvent]
  close: []
}>()

const { result: ticketStatusBaseQueryResult } = useTicketStatusBaseQuery(() => ({
  ticketStatusId: props.ticketStatusId,
}))

const dirtyTicketStatusName = ref<string>()
const ticketStatusName = computed({
  get: () => dirtyTicketStatusName.value ?? ticketStatusBaseQueryResult.value?.ticketStatus?.name ?? '',
  set: value => (dirtyTicketStatusName.value = value),
})

const dirtyColorBase = ref<ColorBase>()
const colorBase = computed({
  get: () =>
    dirtyColorBase.value ?? ticketStatusBaseQueryResult.value?.ticketStatus?.colorBase ?? { hue: 0, saturation: 0 },
  // Have to extract only "hue" and "saturation" from the colorBase, there is also __typename in the back-end response
  set: value =>
    (dirtyColorBase.value = {
      hue: value.hue,
      saturation: value.saturation,
    }),
})

const updateTicketStatusInput = computed<UpdateTicketStatusInput>(() => {
  const data: UpdateTicketStatusInput = {}

  if (
    dirtyTicketStatusName.value &&
    dirtyTicketStatusName.value !== ticketStatusBaseQueryResult.value?.ticketStatus?.name
  ) {
    data.name = dirtyTicketStatusName.value
  }

  if (
    dirtyColorBase.value &&
    (dirtyColorBase.value.hue !== ticketStatusBaseQueryResult.value?.ticketStatus?.colorBase.hue ||
      dirtyColorBase.value.saturation !== ticketStatusBaseQueryResult.value?.ticketStatus?.colorBase.saturation)
  ) {
    data.colorBase = dirtyColorBase.value
  }

  return data
})

const debouncedUpdateTicketStatusInput = refDebounced(updateTicketStatusInput, 500)

const {
  mutate: updateTicketStatus,
  loading: isUpdateTicketStatusMutationLoading,
  onDone,
} = useUpdateTicketStatusMutation(() => ({
  variables: {
    ticketStatusId: props.ticketStatusId,
    input: debouncedUpdateTicketStatusInput.value,
  },
}))

onDone(() => {
  emit('close')
})
</script>

<template>
  <div
    v-if="ticketStatusBaseQueryResult?.ticketStatus"
    class="flex flex-col items-stretch gap-2"
    @click="event => emit('click', event)"
  >
    <TextInput v-model="ticketStatusName" />
    <ColorPicker v-model:colorBase="colorBase" />
    <div class="flex flex-row gap-2">
      <Button :isDisabled="isUpdateTicketStatusMutationLoading" class="grow" @click="() => emit('close')">
        Cancel
      </Button>
      <Button
        :isDisabled="isUpdateTicketStatusMutationLoading"
        class="grow"
        theme="primary"
        @click="() => updateTicketStatus()"
      >
        Save
      </Button>
    </div>
  </div>
</template>
