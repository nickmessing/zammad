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

    <UserTickets :userId="id" ticketsType="created" />
    <UserTickets :userId="id" ticketsType="assigned" />
  </LeftSidebarLayout>
</template>
