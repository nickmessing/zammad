<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import UserProfile from '@/components/organisms/user/UserProfile.vue'
import UserTickets from '@/components/organisms/user/UserTickets.vue'
import LeftSidebarLayout from '@/components/templates/LeftSidebarLayout.vue'

const route = useRoute()

const id = computed(() => String(route.params.id))
</script>

<template>
  <LeftSidebarLayout>
    <template #sidebar>
      <UserProfile :userId="id" />
    </template>
    <div class="flex grow flex-col gap-4 p-4 md:flex-row md:gap-8 md:p-8">
      <UserTickets :userId="id" ticketsType="created" />
      <UserTickets :userId="id" ticketsType="assigned" />
    </div>
  </LeftSidebarLayout>
</template>
