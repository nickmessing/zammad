<script setup lang="ts">
import ZammadButton from '@/components/atoms/common/ZammadButton.vue'
import ZammadColumn from '@/components/atoms/common/ZammadColumn.vue'
import { useCreateTicketStatus } from '@/components/organisms/composition/apollo/ticketStatus/useCreateTicketStatus'

const props = defineProps<{
  nextStatusOrder: number
}>()

const { createTicketStatus } = useCreateTicketStatus()
</script>

<template>
  <div>
    <ZammadColumn class="w-96 shrink-0 grow-0">
      <ZammadButton theme="primary" @click="() => createTicketStatus({ nextStatusOrder: props.nextStatusOrder })">
        Create new status
      </ZammadButton>
    </ZammadColumn>
  </div>
</template>
