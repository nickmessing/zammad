<script setup lang="ts">
import { mdiArrowDown, mdiClose } from '@mdi/js'
import { useToggle, useVModel, onClickOutside } from '@vueuse/core'
import { Tooltip } from 'floating-vue'
import { computed, ref } from 'vue'

import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import UserIndicator from '@/components/molecules/user/UserIndicator.vue'
import { useUsersQuery } from '@/generated/graphql'
import { useUserStore } from '@/stores/user'

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

const userStore = useUserStore()

const userId = useVModel(props, 'userId', emit)
const [isPickerOpen, togglePickerOpen] = useToggle(false)

const container = ref<HTMLDivElement>()

const { result: usersQueryResult } = useUsersQuery()
const activeUser = computed(() => {
  if (!usersQueryResult.value?.users) {
    return
  }

  return usersQueryResult.value.users.find(user => user.id === userId.value)
})

const sortedUsers = computed(() => {
  if (!usersQueryResult.value?.users) {
    return []
  }

  return usersQueryResult.value.users.toSorted((a, b) => a.displayName.localeCompare(b.displayName))
})

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
    >
      <UserIndicator :user="activeUser">
        <div class="flex flex-row gap-1">
          <Tooltip v-if="userStore && !props.isDisabled">
            <ZammadIcon :path="mdiClose" class="rounded hover:bg-blue-200" @click.prevent.stop="() => (userId = '')" />

            <template #popper> Deselect user </template>
          </Tooltip>

          <Tooltip v-if="!props.isDisabled">
            <ZammadIcon
              v-if="!props.isDisabled"
              :path="mdiArrowDown"
              class="rounded hover:bg-blue-200"
              @click.prevent.stop="() => togglePickerOpen(true)"
            />

            <template #popper> Select user </template>
          </Tooltip>
        </div>
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
        <UserIndicator :user="user" isClickDisabled />
      </div>
    </div>
  </div>
</template>
