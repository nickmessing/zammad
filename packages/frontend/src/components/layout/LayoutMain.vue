<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { authorizationToken } from '@/apollo/links/authorization'
import { useMeQuery } from '@/generated/graphql'

import Button from '../atoms/common/Button.vue'
import Alerts from '../specific/Alerts.vue'

const router = useRouter()
const { result, loading } = useMeQuery()

// const isAuthenticated = computed(() => !loading.value && result.value?.me)
const isNotAuthenticated = computed(() => !loading.value && !result.value?.me)

function logout() {
  authorizationToken.value = ''
  void router.push({ name: 'Home' })
}
</script>

<template>
  <nav class="shrink-0 grow-0 bg-gray-800 text-white">
    <div class="mx-auto px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center gap-10 sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center gap-3">
            <img class="h-14 w-14" src="../../assets/logo.svg" />
            <img src="../../assets/logotype.svg" />
          </div>
          <div class="flex flex-grow items-center">
            <div class="flex gap-3">
              <Button :to="{ name: 'Home' }" theme="nav" isActiveClassOnExactMatch> Home </Button>
              <Button v-if="isNotAuthenticated" :to="{ name: 'Authenticate' }" theme="nav"> Authenticate </Button>
              <template v-else>
                <Button :to="{ name: 'Profile' }" theme="nav"> Profile </Button>
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
