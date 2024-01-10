<script setup lang="ts">
import { computed, ref } from 'vue'

import ZammadButton from '@/components/atoms/common/ZammadButton.vue'
import TextInput from '@/components/atoms/forms/TextInput.vue'
import ColorPicker from '@/components/molecules/forms/ColorPicker.vue'
import {
  type ColorBase,
  type UpdateTicketStatusInput,
  useUpdateTicketStatusMutation,
  type TicketStatus,
} from '@/generated/graphql'

import type { ApolloPick } from '@/types/apollo'

const props = defineProps<{
  status: ApolloPick<
    TicketStatus,
    {
      name: true
      colorBase: {
        hue: true
        saturation: true
      }
    }
  >
}>()
const emit = defineEmits<{
  close: []
}>()

const dirtyTicketStatusName = ref<string>()
const ticketStatusName = computed({
  get: () => dirtyTicketStatusName.value ?? props.status.name,
  set: value => (dirtyTicketStatusName.value = value),
})

const dirtyColorBase = ref<ColorBase>()
const colorBase = computed({
  get: () => dirtyColorBase.value ?? props.status.colorBase,
  // Have to extract only "hue" and "saturation" from the colorBase because there is also __typename in the back-end response
  set: value =>
    (dirtyColorBase.value = {
      hue: value.hue,
      saturation: value.saturation,
    }),
})

const ticketStatusUpdatedInput = computed<UpdateTicketStatusInput>(() => {
  const data: UpdateTicketStatusInput = {}

  if (dirtyTicketStatusName.value != undefined && dirtyTicketStatusName.value !== props.status.name) {
    data.name = dirtyTicketStatusName.value
  }

  if (
    dirtyColorBase.value != undefined &&
    (dirtyColorBase.value.hue !== props.status.colorBase.hue ||
      dirtyColorBase.value.saturation !== props.status.colorBase.saturation)
  ) {
    data.colorBase = dirtyColorBase.value
  }

  return data
})

const {
  mutate: updateTicketStatus,
  loading: isUpdateTicketStatusMutationLoading,
  onDone,
} = useUpdateTicketStatusMutation(() => ({
  variables: {
    ticketStatusId: props.status.id,
    input: ticketStatusUpdatedInput.value,
  },
}))

onDone(() => {
  emit('close')
})
</script>

<template>
  <div class="flex flex-col items-stretch gap-2">
    <TextInput v-model="ticketStatusName" />
    <ColorPicker v-model:colorBase="colorBase" />
    <div class="flex flex-row gap-2">
      <ZammadButton :isDisabled="isUpdateTicketStatusMutationLoading" class="grow" @click="() => emit('close')">
        Cancel
      </ZammadButton>
      <ZammadButton
        :isDisabled="isUpdateTicketStatusMutationLoading"
        class="grow"
        theme="primary"
        @click="() => updateTicketStatus()"
      >
        Save
      </ZammadButton>
    </div>
  </div>
</template>
