<script setup lang="ts">
import { useRouter } from 'vue-router'

import { cache } from '@/apollo/cache'
import { authorizationToken } from '@/apollo/links/authorization'
import ZammadLogo from '@/components/atoms/core/ZammadLogo.vue'
import ZammadMenu from '@/components/molecules/core/ZammadMenu.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

async function logout() {
  authorizationToken.value = undefined
  await cache.reset()
  await router.push({ name: 'Home' })
}
</script>

<template>
  <nav class="relative flex h-16 shrink-0 grow-0 items-center justify-start gap-10 bg-gray-800 px-8 text-white">
    <ZammadLogo />
    <div class="flex grow items-center gap-3">
      <ZammadMenu
        :isUserAuthenticated="userStore.isAuthenticated"
        :isUserNotAuthenticated="userStore.isNotAuthenticated"
        :userId="userStore.userId"
        @logout="logout"
      />
    </div>
  </nav>
</template>
