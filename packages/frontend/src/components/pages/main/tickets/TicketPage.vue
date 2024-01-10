<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import TicketDetails from '@/components/organisms/ticket/TicketDetails.vue'
import LeftSidebarLayout from '@/components/templates/LeftSidebarLayout.vue'

const route = useRoute()

const id = computed(() => String(route.params.id))
</script>

<template>
  <LeftSidebarLayout>
    <template #sidebar>
      <TicketDetails :ticketId="id" />
    </template>

    Main Content
  </LeftSidebarLayout>
</template>
