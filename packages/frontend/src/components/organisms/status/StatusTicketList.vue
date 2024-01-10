<script setup lang="ts">
import { mdiLoading } from '@mdi/js'
import { useElementVisibility } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import TicketCard from '@/components/molecules/ticket/TicketCard.vue'
import { useTicketStatusTicketsQuery } from '@/generated/graphql'
import { TICKETS_PER_PAGE } from '@/utils/constants'

const props = defineProps<{
  ticketStatusId: string
}>()

const loadingSpinnerContainer = ref<HTMLDivElement>()
const isLoadingSpinnerContainerVisible = useElementVisibility(loadingSpinnerContainer)

const {
  result: ticketStatusTicketsQueryResult,
  loading: isTicketStatusTicketsQueryLoading,
  fetchMore: fetchMoreTicketStatusTickets,
} = useTicketStatusTicketsQuery(() => ({
  ticketStatusId: props.ticketStatusId,
  first: TICKETS_PER_PAGE,
  after: undefined,
}))

const tickets = computed(() => ticketStatusTicketsQueryResult.value?.ticketStatus?.tickets.items ?? [])
const isLoadMorePossible = computed(() =>
  Boolean(ticketStatusTicketsQueryResult.value?.ticketStatus?.tickets.endCursor),
)
async function fetchMore() {
  if (isTicketStatusTicketsQueryLoading.value || !isLoadMorePossible.value) {
    return
  }

  if (!ticketStatusTicketsQueryResult.value?.ticketStatus?.tickets.endCursor) {
    return
  }

  await fetchMoreTicketStatusTickets({
    variables: {
      ticketStatusId: props.ticketStatusId,
      first: TICKETS_PER_PAGE,
      after: ticketStatusTicketsQueryResult.value.ticketStatus.tickets.endCursor,
    },
  })
}

watch(isLoadingSpinnerContainerVisible, isVisible => {
  if (isVisible) {
    void fetchMore()
  }
})
</script>

<template>
  <div class="flex grow flex-col gap-2 overflow-auto">
    <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    <div
      v-if="isLoadMorePossible || isTicketStatusTicketsQueryLoading"
      ref="loadingSpinnerContainer"
      class="flex shrink-0 flex-row justify-center overflow-hidden"
    >
      <ZammadIcon
        :path="mdiLoading"
        :class="{ 'opacity-100': isTicketStatusTicketsQueryLoading }"
        class="animate-spin opacity-0 transition-opacity"
      />
    </div>
  </div>
</template>
