<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { cache } from '@/apollo/cache'
import { authorizationToken } from '@/apollo/links/authorization'
import SidebarMenu from '@/components/molecules/core/SidebarMenu.vue'
import ZammadHeader from '@/components/molecules/core/ZammadHeader.vue'
import GlobalAlertsDisplay from '@/components/organisms/alert/GlobalAlertsDisplay.vue'
import LayoutMain from '@/components/templates/LayoutMain.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const isSidebarMenuOpen = ref(false)

async function logout() {
  authorizationToken.value = undefined
  await cache.reset()
  await router.push({ name: 'Home' })
}
</script>

<template>
  <LayoutMain>
    <template #header>
      <ZammadHeader
        :isUserAuthenticated="userStore.isAuthenticated"
        :isUserNotAuthenticated="userStore.isNotAuthenticated"
        :currentUserId="userStore.userId"
        @logout="logout"
        @click:menu="() => (isSidebarMenuOpen = true)"
      />
    </template>
    <template #additional>
      <GlobalAlertsDisplay />
      <SidebarMenu
        v-model:isOpen="isSidebarMenuOpen"
        :isUserAuthenticated="userStore.isAuthenticated"
        :isUserNotAuthenticated="userStore.isNotAuthenticated"
        :currentUserId="userStore.userId"
        @logout="logout"
      />
    </template>
    <RouterView />
  </LayoutMain>
</template>
