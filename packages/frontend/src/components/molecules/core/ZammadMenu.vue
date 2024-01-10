<script setup lang="ts">
import ZammadButton from '@/components/atoms/common/ZammadButton.vue'

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
  logout: []
}>()
</script>

<template>
  <div class="flex grow items-center gap-3">
    <ZammadButton :to="{ name: 'Home' }" theme="nav" isActiveClassOnExactMatch> Home </ZammadButton>
    <ZammadButton :to="{ name: 'Tickets' }" theme="nav"> Tickets </ZammadButton>
    <template v-if="props.isUserAuthenticated">
      <ZammadButton :to="{ name: 'User', params: { id: props.currentUserId } }" theme="nav"> Profile </ZammadButton>
      <ZammadButton theme="nav" @click="() => emit('logout')"> Logout </ZammadButton>
    </template>
    <ZammadButton v-else-if="props.isUserNotAuthenticated" :to="{ name: 'Authenticate' }" theme="nav">
      Authenticate
    </ZammadButton>
  </div>
</template>
