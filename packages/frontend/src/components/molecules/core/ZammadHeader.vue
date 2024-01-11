<script setup lang="ts">
import { mdiMenu } from '@mdi/js'

import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import ZammadLogo from '@/components/atoms/core/ZammadLogo.vue'
import ZammadMenu from '@/components/molecules/core/ZammadMenu.vue'

const props = withDefaults(
  defineProps<{
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
  'click:menu': [event: MouseEvent]
  logout: []
}>()
</script>

<template>
  <nav class="relative flex h-16 shrink-0 grow-0 items-center justify-start gap-10 bg-gray-800 px-8 text-white">
    <div class="w-6 shrink-0 grow-0 md:hidden">
      <ZammadIcon :path="mdiMenu" @click="event => emit('click:menu', event)" />
    </div>
    <div class="flex grow items-center justify-center md:grow-0">
      <ZammadLogo />
    </div>
    <div class="w-6 shrink-0 grow-0 md:hidden" />
    <div class="hidden grow items-center gap-3 md:flex">
      <ZammadMenu
        :isUserAuthenticated="props.isUserAuthenticated"
        :isUserNotAuthenticated="props.isUserNotAuthenticated"
        :currentUserId="props.currentUserId"
        @logout="() => emit('logout')"
      />
    </div>
  </nav>
</template>
