<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="bg-gray-800 text-white">
    <div class="mx-auto px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-14 w-14" src="../../assets/logo.svg" />
            <img class="ml-3" src="../../assets/logotype.svg" />
          </div>
          <div class="ml-10 flex items-center align-middle">
            <div class="flex space-x-4">
              <RouterLink
                to="/"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                exactActiveClass="bg-gray-900 text-white"
                >Home</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main class="flex justify-center">
    <RouterView />
  </main>
</template>
