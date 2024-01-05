<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Profile from '@/components/core/user/Profile.vue'

const route = useRoute()

const id = computed(() => String(route.params.id))
</script>

<template>
  <div class="flex flex-grow flex-row">
    <div class="flex w-96 flex-shrink-0 flex-grow-0 flex-col gap-8 bg-slate-300 p-8">
      <Profile :id="id" />
    </div>
    <div class="flex-grow-0 p-8">Something here</div>
  </div>
</template>
