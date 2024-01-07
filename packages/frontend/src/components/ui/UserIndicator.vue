<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useUserQuery } from '@/generated/graphql'

import Avatar from '../core/user/Avatar.vue'

const props = defineProps<{
  userId: string
}>()
defineSlots<{
  default(): unknown
}>()

const { result: userQueryResult } = useUserQuery(() => ({
  userId: props.userId,
}))
</script>

<template>
  <RouterLink
    v-if="userQueryResult?.user"
    :to="{ name: 'User', params: { id: userQueryResult.user.id } }"
    class="flex flex-row items-center gap-2"
  >
    <Avatar :userId="userQueryResult.user.id" />
    <div>
      {{ userQueryResult.user.displayName }}
    </div>
  </RouterLink>
</template>
