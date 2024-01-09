<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Heading from '@/components/atoms/common/Heading.vue'
import Profile from '@/components/core/user/Profile.vue'
import UserTickets from '@/components/ui/UserTickets.vue'

const route = useRoute()

const id = computed(() => String(route.params.id))
</script>

<template>
  <div class="flex grow flex-row">
    <div class="flex w-96 shrink-0 grow-0 flex-col gap-8 bg-slate-300 p-8">
      <Profile :userId="id" />
    </div>
    <div class="flex grow flex-row gap-8 p-8">
      <div class="flex grow basis-0 flex-col gap-4 rounded bg-slate-200 p-4">
        <Heading>Created Tickets</Heading>
        <UserTickets :userId="id" ticketsType="created" />
      </div>
      <div class="flex grow basis-0 flex-col gap-4 rounded bg-slate-200 p-4">
        <Heading>Assigned Tickets</Heading>
        <UserTickets :userId="id" ticketsType="assigned" />
      </div>
    </div>
  </div>
</template>
