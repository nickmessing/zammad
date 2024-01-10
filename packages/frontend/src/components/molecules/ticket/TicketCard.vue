<script setup lang="ts">
import ColoredCard from '@/components/atoms/colored/ColoredCard.vue'
import ZammadHeading from '@/components/atoms/common/ZammadHeading.vue'
import StatusIndicator from '@/components/molecules/status/StatusIndicator.vue'
import UserIndicator from '@/components/molecules/user/UserIndicator.vue'

import type { Ticket } from '@/generated/graphql'
import type { ApolloPick } from '@/types/apollo'

const props = defineProps<{
  ticket: ApolloPick<
    Ticket,
    {
      title: true
      assignee: {
        displayName: true
      }
      status: {
        name: true
        colorBase: {
          hue: true
          saturation: true
        }
      }
    }
  >
}>()
</script>

<template>
  <ColoredCard :colorBase="props.ticket.status.colorBase" :to="{ name: 'Ticket', params: { id: props.ticket.id } }">
    <ZammadHeading :level="3">{{ props.ticket.title }}</ZammadHeading>
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-row items-center gap-2">
        <UserIndicator v-if="props.ticket.assignee" :user="props.ticket.assignee" />
      </div>
      <StatusIndicator :status="ticket.status" />
    </div>
  </ColoredCard>
</template>
