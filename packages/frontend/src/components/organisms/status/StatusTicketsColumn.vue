<script setup lang="ts">
import { whenever } from '@vueuse/shared'
import { computed, ref } from 'vue'

import ZammadButton from '@/components/atoms/common/ZammadButton.vue'
import ZammadColumn from '@/components/atoms/common/ZammadColumn.vue'
import ZammadHeading from '@/components/atoms/common/ZammadHeading.vue'
import TextInput from '@/components/atoms/forms/TextInput.vue'
import ColorPicker from '@/components/molecules/forms/ColorPicker.vue'
import StatusIndicator from '@/components/molecules/status/StatusIndicator.vue'
import {
  useTicketStatusQuery,
  type ColorBase,
  type UpdateTicketStatusInput,
  useUpdateTicketStatusMutation,
} from '@/generated/graphql'
import { useUserStore } from '@/stores/user'

import StatusRemoval from './StatusRemoval.vue'
import StatusTicketList from './StatusTicketList.vue'

const props = defineProps<{
  ticketStatusId: string
}>()

const userStore = useUserStore()

const { result: ticketStatusQueryResult } = useTicketStatusQuery(() => ({
  ticketStatusId: props.ticketStatusId,
}))

const isEditingTicketStatus = ref(false)
function toggleIsEditingTicketStatus(value?: boolean) {
  isEditingTicketStatus.value = userStore.isAuthenticated ? value ?? !isEditingTicketStatus.value : false
}

const dirtyTicketStatusName = ref<string>()
const ticketStatusName = computed({
  get: () => dirtyTicketStatusName.value ?? ticketStatusQueryResult.value?.ticketStatus?.name ?? '',
  set: value => (dirtyTicketStatusName.value = value),
})

const dirtyColorBase = ref<ColorBase>()
const colorBase = computed({
  get: () =>
    dirtyColorBase.value ?? ticketStatusQueryResult.value?.ticketStatus?.colorBase ?? { hue: 0, saturation: 0 },
  // Have to extract only "hue" and "saturation" from the colorBase because there is also __typename in the back-end response
  set: value =>
    (dirtyColorBase.value = {
      hue: value.hue,
      saturation: value.saturation,
    }),
})

whenever(
  () => !isEditingTicketStatus.value,
  () => {
    dirtyTicketStatusName.value = undefined
    dirtyColorBase.value = undefined
  },
)

const ticketStatusUpdatedInput = computed<UpdateTicketStatusInput>(() => {
  const data: UpdateTicketStatusInput = {}

  if (
    dirtyTicketStatusName.value != undefined &&
    dirtyTicketStatusName.value !== ticketStatusQueryResult.value?.ticketStatus?.name
  ) {
    data.name = dirtyTicketStatusName.value
  }

  if (
    dirtyColorBase.value != undefined &&
    (dirtyColorBase.value.hue !== ticketStatusQueryResult.value?.ticketStatus?.colorBase.hue ||
      dirtyColorBase.value.saturation !== ticketStatusQueryResult.value?.ticketStatus?.colorBase.saturation)
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
    ticketStatusId: props.ticketStatusId,
    input: ticketStatusUpdatedInput.value,
  },
}))

onDone(() => {
  toggleIsEditingTicketStatus(false)
})
</script>

<template>
  <ZammadColumn v-if="ticketStatusQueryResult?.ticketStatus" class="w-96 shrink-0 grow-0">
    <ZammadHeading>
      <div v-if="isEditingTicketStatus" class="flex flex-col items-stretch gap-2">
        <TextInput v-model="ticketStatusName" />
        <ColorPicker v-model:colorBase="colorBase" />
        <div class="flex flex-row gap-2">
          <ZammadButton
            :isDisabled="isUpdateTicketStatusMutationLoading"
            class="grow"
            @click="() => toggleIsEditingTicketStatus(false)"
          >
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
      <div v-else class="flex flex-row items-center gap-2">
        <StatusIndicator
          :status="ticketStatusQueryResult.ticketStatus"
          class="grow"
          isClickable
          @click="() => toggleIsEditingTicketStatus(true)"
        />
        <StatusRemoval :status="ticketStatusQueryResult.ticketStatus" />
      </div>
    </ZammadHeading>
    <StatusTicketList :ticketStatusId="props.ticketStatusId" />
  </ZammadColumn>
</template>
