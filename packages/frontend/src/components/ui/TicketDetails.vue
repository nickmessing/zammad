<script setup lang="ts">
import { mdiCheck, mdiLoading } from '@mdi/js'
import { refDebounced, useTimeAgo, useTimeoutFn } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import Icon from '@/components/atoms/common/Icon.vue'
import Label from '@/components/atoms/forms/Label.vue'
import TextInput from '@/components/atoms/forms/TextInput.vue'
import { useTicketQuery, useUpdateTicketMutation, type UpdateTicketInput, useMeQuery } from '@/generated/graphql'
import { areObjectsEqual } from '@/utils/common'

import StatusPicker from './StatusPicker.vue'
import UserIndicator from './UserIndicator.vue'
import UserPicker from './UserPicker.vue'

const props = defineProps<{
  id: string
}>()

const { result: meQueryResult } = useMeQuery()
const isAuthenticated = computed(() => Boolean(meQueryResult.value?.me))

const { result: ticketQueryResult } = useTicketQuery(() => ({
  ticketId: props.id,
}))

const lastModified = useTimeAgo(() => ticketQueryResult.value?.ticket?.updatedAt ?? '', {
  showSecond: true,
  updateInterval: 1000,
})

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

const updateTicketInput = computed<UpdateTicketInput>(() => {
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

const debouncedUpdateTicketInput = refDebounced(updateTicketInput, 500)

const {
  mutate: updateTicket,
  loading: isUpdateTicketMutationLoading,
  onDone,
} = useUpdateTicketMutation(() => ({
  variables: {
    ticketId: props.id,
    input: debouncedUpdateTicketInput.value,
  },
}))

const isSaving = computed(
  () =>
    isUpdateTicketMutationLoading.value || !areObjectsEqual(debouncedUpdateTicketInput.value, updateTicketInput.value),
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

watch(debouncedUpdateTicketInput, () => {
  void updateTicket()
})
</script>

<template>
  <div v-if="ticketQueryResult?.ticket" class="relative flex flex-col gap-4">
    <Transition name="fade-and-slide">
      <div v-if="isSaving" class="absolute right-0 top-0 flex -translate-y-1/2 flex-row gap-2">
        <div>Saving...</div>
        <Icon :path="mdiLoading" class="animate-spin" />
      </div>
      <div v-else-if="isJustSaved" class="absolute right-0 top-0 flex -translate-y-1/2 flex-row gap-2">
        <div>Saved</div>
        <Icon :path="mdiCheck" />
      </div>
    </Transition>
    <Label>
      <template #label> Title </template>
      <TextInput v-model="ticketTitle" :isDisabled="!isAuthenticated" name="ticketTitle" />
    </Label>
    <!-- TODO: Replace with a rich text editor -->
    <Label>
      <template #label> Description </template>
      <TextInput v-model="ticketDescription" :isDisabled="!isAuthenticated" name="ticketDescription" isTextarea />
    </Label>
    <Label isNoPointerCursor>
      <template #label> Status </template>
      <StatusPicker v-model:ticketStatusId="ticketStatusId" :isDisabled="!isAuthenticated" />
    </Label>
    <Label isNoPointerCursor>
      <template #label> Assignee </template>
      <UserPicker v-model:userId="ticketAssigneeId" :isDisabled="!isAuthenticated" />
    </Label>
    <Label isNoPointerCursor>
      <template #label> Author </template>
      <UserIndicator :userId="ticketQueryResult.ticket.author.id" />
    </Label>
    <div class="text-sm text-gray-700">Last updated {{ lastModified }}</div>
  </div>
</template>
