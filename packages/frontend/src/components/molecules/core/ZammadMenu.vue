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
  itemClick: [event: MouseEvent]
}>()

function handleItemClick(event: MouseEvent) {
  emit('itemClick', event)
}
</script>

<template>
  <div class="flex grow flex-col items-stretch gap-3 md:flex-row">
    <ZammadButton :to="{ name: 'Home' }" theme="nav" isActiveClassOnExactMatch @click="handleItemClick">
      Home
    </ZammadButton>
    <ZammadButton :to="{ name: 'Tickets' }" theme="nav" @click="handleItemClick"> Tickets </ZammadButton>
    <template v-if="props.isUserAuthenticated">
      <ZammadButton
        v-if="props.currentUserId"
        :to="{ name: 'User', params: { id: props.currentUserId } }"
        theme="nav"
        @click="handleItemClick"
      >
        Profile
      </ZammadButton>
      <ZammadButton
        theme="nav"
        class="text-left"
        @click="
          event => {
            emit('logout')
            handleItemClick(event)
          }
        "
      >
        Logout
      </ZammadButton>
    </template>
    <ZammadButton
      v-else-if="props.isUserNotAuthenticated"
      :to="{ name: 'Authenticate' }"
      theme="nav"
      @click="handleItemClick"
    >
      Authenticate
    </ZammadButton>
  </div>
</template>
