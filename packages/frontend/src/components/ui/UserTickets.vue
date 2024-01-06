<script setup lang="ts">
import { mdiLoading } from '@mdi/js'
import { computed } from 'vue'

import { useUserAssignedTicketsQuery, useUserCreatedTicketsQuery } from '@/generated/graphql'
import { TICKETS_PER_PAGE } from '@/utils/constants'

import Icon from '../atoms/common/Icon.vue'

import TicketCard from './TicketCard.vue'

const props = defineProps<{
  userId: string
  ticketsType: 'assigned' | 'created'
}>()

const { result: createdTicketsQueryResult, loading: isCreatedTicketsQueryLoading } = useUserCreatedTicketsQuery(
  () => ({
    userId: props.userId,
    first: TICKETS_PER_PAGE,
    after: undefined,
  }),
  () => ({
    enabled: props.ticketsType === 'created',
  }),
)
const { result: assignedTicketsQueryResult, loading: isAssignedTicketsQueryLoading } = useUserAssignedTicketsQuery(
  () => ({
    userId: props.userId,
    first: TICKETS_PER_PAGE,
    after: undefined,
  }),
  () => ({
    enabled: props.ticketsType === 'assigned',
  }),
)

const tickets = computed(
  () =>
    (props.ticketsType === 'created'
      ? createdTicketsQueryResult.value?.user?.createdTickets.items
      : assignedTicketsQueryResult.value?.user?.assignedTickets.items) ?? [],
)
const isLoading = computed(() =>
  props.ticketsType === 'created' ? isCreatedTicketsQueryLoading.value : isAssignedTicketsQueryLoading.value,
)
</script>

<template>
  <div class="flex flex-grow flex-col gap-2 overflow-auto">
    <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticketId="ticket.id" />
    <div class="flex shrink-0 flex-row justify-center overflow-hidden">
      <Icon
        :path="mdiLoading"
        :class="{ 'opacity-100': isLoading }"
        class="animate-spin opacity-0 transition-opacity"
      />
    </div>
  </div>
</template>
