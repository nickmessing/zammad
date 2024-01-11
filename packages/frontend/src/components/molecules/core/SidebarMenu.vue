<script setup lang="ts">
import { onClickOutside, useVModel } from '@vueuse/core'
import { ref } from 'vue'

import ZammadMenu from './ZammadMenu.vue'

const props = withDefaults(
  defineProps<{
    isOpen: boolean
    isUserAuthenticated?: boolean
    isUserNotAuthenticated?: boolean
    currentUserId?: string
  }>(),
  {
    isUserAuthenticated: false,
    isUserNotAuthenticated: false,
    currentUserId: undefined,
  },
)
const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()
const isOpen = useVModel(props, 'isOpen', emit)

const aside = ref<HTMLElement>()

onClickOutside(
  aside,
  event => {
    if (!isOpen.value) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    isOpen.value = false
  },
  { capture: true },
)

function handleItemClick() {
  isOpen.value = false
}
</script>

<template>
  <aside
    ref="aside"
    :class="{
      '-translate-x-full': !isOpen,
      'translate-x-0': isOpen,
    }"
    class="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
  >
    <div class="h-full overflow-y-auto border-r border-gray-700 bg-gray-800 px-3 py-5 shadow">
      <ZammadMenu
        :isUserAuthenticated="props.isUserAuthenticated"
        :isUserNotAuthenticated="props.isUserNotAuthenticated"
        :currentUserId="props.currentUserId"
        @itemClick="handleItemClick"
      />
    </div>
  </aside>
</template>
