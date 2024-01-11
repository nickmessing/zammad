<script setup lang="ts">
import { mdiLoading } from '@mdi/js'
import { useElementVisibility } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import ZammadColumn from '@/components/atoms/common/ZammadColumn.vue'
import ZammadHeading from '@/components/atoms/common/ZammadHeading.vue'
import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import TicketCard from '@/components/molecules/ticket/TicketCard.vue'
import { useUserAssignedTicketsQuery, useUserCreatedTicketsQuery } from '@/generated/graphql'
import { TICKETS_PER_PAGE } from '@/utils/constants'

const props = defineProps<{
  userId: string
  ticketsType: 'assigned' | 'created'
}>()

const loadingSpinnerContainer = ref<HTMLDivElement>()
const isLoadingSpinnerContainerVisible = useElementVisibility(loadingSpinnerContainer)

const {
  result: createdTicketsQueryResult,
  loading: isCreatedTicketsQueryLoading,
  fetchMore: fetchMoreCreatedTickets,
} = useUserCreatedTicketsQuery(
  () => ({
    userId: props.userId,
    first: TICKETS_PER_PAGE,
    after: undefined,
  }),
  () => ({
    enabled: props.ticketsType === 'created',
  }),
)
const {
  result: assignedTicketsQueryResult,
  loading: isAssignedTicketsQueryLoading,
  fetchMore: fetchMoreAssignedTickets,
} = useUserAssignedTicketsQuery(
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
const isLoadMorePossible = computed(() =>
  Boolean(
    props.ticketsType === 'created'
      ? createdTicketsQueryResult.value?.user?.createdTickets.endCursor
      : assignedTicketsQueryResult.value?.user?.assignedTickets.endCursor,
  ),
)
async function fetchMore() {
  if (isLoading.value || !isLoadMorePossible.value) {
    return
  }
  if (props.ticketsType === 'created') {
    if (!createdTicketsQueryResult.value?.user?.createdTickets.endCursor) {
      return
    }

    await fetchMoreCreatedTickets({
      variables: {
        userId: props.userId,
        first: TICKETS_PER_PAGE,
        after: createdTicketsQueryResult.value.user.createdTickets.endCursor,
      },
    })
  } else {
    if (!assignedTicketsQueryResult.value?.user?.assignedTickets.endCursor) {
      return
    }

    await fetchMoreAssignedTickets({
      variables: {
        userId: props.userId,
        first: TICKETS_PER_PAGE,
        after: assignedTicketsQueryResult.value.user.assignedTickets.endCursor,
      },
    })
  }
}

watch(isLoadingSpinnerContainerVisible, isVisible => {
  if (isVisible) {
    void fetchMore()
  }
})
</script>

<template>
  <ZammadColumn class="max-h-screen grow basis-0">
    <ZammadHeading>{{ props.ticketsType === 'created' ? 'Created' : 'Assigned' }} Tickets</ZammadHeading>

    <div class="flex grow flex-col gap-2 overflow-auto">
      <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
      <div
        v-if="isLoadMorePossible || isLoading"
        ref="loadingSpinnerContainer"
        class="flex shrink-0 flex-row justify-center overflow-hidden"
      >
        <ZammadIcon
          :path="mdiLoading"
          :class="{ 'opacity-100': isLoading }"
          class="animate-spin opacity-0 transition-opacity"
        />
      </div>
    </div>
  </ZammadColumn>
</template>
