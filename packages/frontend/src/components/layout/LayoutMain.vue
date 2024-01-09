<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

import { cache } from '@/apollo/cache'
import { authorizationToken } from '@/apollo/links/authorization'
import Button from '@/components/atoms/common/Button.vue'
import Alerts from '@/components/specific/Alerts.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

async function logout() {
  authorizationToken.value = ''
  await cache.reset()
  await router.push({ name: 'Home' })
}
</script>

<template>
  <nav class="shrink-0 grow-0 bg-gray-800 text-white">
    <div class="mx-auto px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center gap-10 sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center gap-3">
            <img class="h-14 w-14" src="@/assets/logo.svg" />
            <img src="@/assets/logotype.svg" />
          </div>
          <div class="flex grow items-center">
            <div class="flex gap-3">
              <Button :to="{ name: 'Home' }" theme="nav" isActiveClassOnExactMatch> Home </Button>
              <Button :to="{ name: 'Tickets' }" theme="nav"> Tickets </Button>
              <Button v-if="userStore.isNotAuthenticated" :to="{ name: 'Authenticate' }" theme="nav">
                Authenticate
              </Button>
              <template v-else-if="userStore.userId">
                <Button :to="{ name: 'User', params: { id: userStore.userId } }" theme="nav"> Profile </Button>
                <Button theme="nav" @click="logout"> Logout </Button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main class="relative flex grow overflow-hidden">
    <div class="flex grow overflow-auto">
      <RouterView />
    </div>
    <Alerts />
  </main>
</template>
