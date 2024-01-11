<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import TicketComments from '@/components/organisms/comment/TicketComments.vue'
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

    <TicketComments :ticketId="id" />
  </LeftSidebarLayout>
</template>
