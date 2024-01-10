<script setup lang="ts">
import { mdiCheck, mdiLoading } from '@mdi/js'
import { refDebounced, useTimeoutFn } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import TextInput from '@/components/atoms/forms/TextInput.vue'
import ZammadLabel from '@/components/atoms/forms/ZammadLabel.vue'
import TimeAgo from '@/components/molecules/date-time/TimeAgo.vue'
import UserIndicator from '@/components/molecules/user/UserIndicator.vue'
import { useTicketQuery, type UpdateTicketInput, useUpdateTicketMutation } from '@/generated/graphql'
import { useUserStore } from '@/stores/user'
import { areObjectsEqual } from '@/utils/common'

import StatusPicker from '../status/StatusPicker.vue'
import UserPicker from '../user/UserPicker.vue'

const props = defineProps<{
  ticketId: string
}>()

const userStore = useUserStore()

const { result: ticketQueryResult } = useTicketQuery(() => ({
  ticketId: props.ticketId,
}))

const dirtyTicketTitle = ref<string>()
const ticketTitle = computed({
  get: () => dirtyTicketTitle.value ?? ticketQueryResult.value?.ticket?.title ?? '',
  set: value => (dirtyTicketTitle.value = value),
})

const dirtyTicketDescription = ref<string>()
const ticketDescription = computed({
  get: () => dirtyTicketDescription.value ?? ticketQueryResult.value?.ticket?.description ?? '',
  set: value => (dirtyTicketDescription.value = value),
})

const dirtyTicketStatusId = ref<string>()
const ticketStatusId = computed({
  get: () => dirtyTicketStatusId.value ?? ticketQueryResult.value?.ticket?.status.id ?? '',
  set: value => (dirtyTicketStatusId.value = value),
})

const dirtyTicketAssigneeId = ref<string>()
const ticketAssigneeId = computed({
  get: () => dirtyTicketAssigneeId.value ?? ticketQueryResult.value?.ticket?.assignee?.id ?? '',
  set: value => (dirtyTicketAssigneeId.value = value),
})

const ticketUpdateInput = computed<UpdateTicketInput>(() => {
  const data: UpdateTicketInput = {}

  if (dirtyTicketTitle.value && dirtyTicketTitle.value !== ticketQueryResult.value?.ticket?.title) {
    data.title = dirtyTicketTitle.value
  }
  if (dirtyTicketDescription.value && dirtyTicketDescription.value !== ticketQueryResult.value?.ticket?.description) {
    data.description = dirtyTicketDescription.value
  }
  if (dirtyTicketStatusId.value && dirtyTicketStatusId.value !== ticketQueryResult.value?.ticket?.status.id) {
    data.statusId = dirtyTicketStatusId.value
  }
  if (
    dirtyTicketAssigneeId.value !== undefined &&
    dirtyTicketAssigneeId.value !== ticketQueryResult.value?.ticket?.assignee?.id
  ) {
    data.assigneeId = dirtyTicketAssigneeId.value
  }

  return data
})

const debouncedTicketUpdateInput = refDebounced(ticketUpdateInput, 500)

const {
  mutate: updateTicket,
  loading: isUpdateTicketMutationLoading,
  onDone,
} = useUpdateTicketMutation(() => ({
  variables: {
    ticketId: props.ticketId,
    input: debouncedTicketUpdateInput.value,
  },
}))

const isSaving = computed(
  () =>
    isUpdateTicketMutationLoading.value || !areObjectsEqual(debouncedTicketUpdateInput.value, ticketUpdateInput.value),
)
const isJustSaved = ref(false)
const { start: delayedResetIsJustSaved } = useTimeoutFn(
  () => {
    isJustSaved.value = false
  },
  3000,
  { immediate: false },
)

onDone(() => {
  isJustSaved.value = true
  delayedResetIsJustSaved()
})

watch(debouncedTicketUpdateInput, (newValue, oldValue) => {
  if (areObjectsEqual(newValue, oldValue)) {
    return
  }

  void updateTicket()
})
</script>

<template>
  <div v-if="ticketQueryResult?.ticket" class="relative flex grow flex-col gap-4">
    <Transition name="fade-and-slide">
      <div v-if="isSaving" class="absolute right-0 top-0 flex -translate-y-1/2 flex-row gap-2">
        <div>Saving...</div>
        <ZammadIcon :path="mdiLoading" class="animate-spin" />
      </div>
      <div v-else-if="isJustSaved" class="absolute right-0 top-0 flex -translate-y-1/2 flex-row gap-2">
        <div>Saved</div>
        <ZammadIcon :path="mdiCheck" />
      </div>
    </Transition>
    <ZammadLabel>
      <template #label> Title </template>
      <TextInput v-model="ticketTitle" :isDisabled="!userStore.isAuthenticated" name="ticketTitle" />
    </ZammadLabel>
    <!-- TODO: Replace with a rich text editor -->
    <ZammadLabel>
      <template #label> Description </template>
      <TextInput
        v-model="ticketDescription"
        :isDisabled="!userStore.isAuthenticated"
        name="ticketDescription"
        isTextarea
      />
    </ZammadLabel>
    <ZammadLabel isNoPointerCursor>
      <template #label> Status </template>
      <StatusPicker v-model:ticketStatusId="ticketStatusId" :isDisabled="!userStore.isAuthenticated" />
    </ZammadLabel>
    <ZammadLabel isNoPointerCursor>
      <template #label> Assignee </template>
      <UserPicker v-model:userId="ticketAssigneeId" :isDisabled="!userStore.isAuthenticated" />
    </ZammadLabel>
    <ZammadLabel isNoPointerCursor>
      <template #label> Author </template>
      <UserIndicator :user="ticketQueryResult.ticket.author" />
    </ZammadLabel>
    <div class="grow" />
    <div class="flex items-center justify-center gap-1 text-sm text-gray-700">
      Last updated
      <TimeAgo :date="ticketQueryResult.ticket.updatedAt" />
    </div>
  </div>
</template>
