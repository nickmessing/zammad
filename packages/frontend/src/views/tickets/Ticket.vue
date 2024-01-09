<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import TicketDetails from '@/components/ui/TicketDetails.vue'

const route = useRoute()

const id = computed(() => String(route.params.id))
</script>

<template>
  <div class="flex grow flex-row">
    <div class="flex w-96 shrink-0 grow-0 flex-col gap-8 bg-slate-300 p-8">
      <TicketDetails :id="id" />
    </div>
    <div class="flex grow flex-row gap-8 p-8">Comments here</div>
  </div>
</template>
