<script setup lang="ts">
import { mdiClose } from '@mdi/js'
import { useToggle, useVModel, onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useUsersQuery } from '@/generated/graphql'

import Icon from '../atoms/common/Icon.vue'

import UserIndicator from './UserIndicator.vue'

const props = withDefaults(
  defineProps<{
    userId: string
    isDisabled?: boolean
  }>(),
  {
    isDisabled: false,
  },
)
const emit = defineEmits<{
  'update:userId': [userId: string]
}>()
const userId = useVModel(props, 'userId', emit)
const [isPickerOpen, togglePickerOpen] = useToggle(false)

const container = ref<HTMLDivElement>()

const { result: usersQueryResult } = useUsersQuery()

const sortedUsers = computed(() => {
  if (!usersQueryResult.value?.users) {
    return []
  }

  return usersQueryResult.value.users.toSorted((a, b) => a.displayName.localeCompare(b.displayName))
})

function handleIndicatorClick() {
  if (props.isDisabled) {
    return
  }

  togglePickerOpen()
}
function handleOptionClick(newUserId: string) {
  userId.value = newUserId
  togglePickerOpen(false)
}

onClickOutside(container, () => {
  togglePickerOpen(false)
})
</script>

<template>
  <div v-if="usersQueryResult?.users" ref="container" class="relative h-10 w-full">
    <div
      :class="{
        'cursor-not-allowed bg-gray-200': props.isDisabled,
      }"
      class="flex cursor-pointer flex-row items-center justify-start rounded-md border border-transparent bg-white p-2 hover:border-blue-300 active:border-blue-400"
      @click="handleIndicatorClick"
    >
      <UserIndicator :userId="userId" isClickDisabled>
        <Icon :path="mdiClose" class="rounded hover:bg-blue-200" @click.prevent.stop="userId = ''" />
      </UserIndicator>
    </div>
    <div v-if="isPickerOpen" class="absolute z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white">
      <div
        v-for="user in sortedUsers"
        :key="user.id"
        :class="{
          'border-blue-500': user.id === userId,
          'border-transparent': user.id !== userId,
        }"
        class="flex cursor-pointer flex-row items-center justify-start rounded-md border bg-white p-2 hover:border-blue-300 active:border-blue-400"
        @click="() => handleOptionClick(user.id)"
      >
        <UserIndicator :userId="user.id" isClickDisabled />
      </div>
    </div>
  </div>
</template>
