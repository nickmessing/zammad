<script setup lang="ts">
import { mdiTrashCan } from '@mdi/js'
import { Dropdown } from 'floating-vue'
import { ref } from 'vue'

import ZammadButton from '@/components/atoms/common/ZammadButton.vue'
import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'

import { useRemoveTicketStatus } from '../composition/apollo/ticketStatus/useRemoveTicketStatus'

import type { TicketStatus } from '@/generated/graphql'
import type { ApolloPick } from '@/types/apollo'

const props = defineProps<{
  status: ApolloPick<
    TicketStatus,
    {
      id: true
    }
  >
}>()

const isRemovalConfirmationVisible = ref(false)

const { removeTicketStatus } = useRemoveTicketStatus()
</script>

<template>
  <Dropdown v-model:shown="isRemovalConfirmationVisible">
    <ZammadIcon :path="mdiTrashCan" class="shrink-0 cursor-pointer text-gray-500 hover:text-gray-800" />

    <template #popper>
      <div class="flex flex-col gap-2 p-4">
        <p>Are you sure you want to send this status to the digital beyond?</p>
        <p>Just a heads-up: all its ticket buddies will join the farewell party too!</p>
        <div class="flex flex-row gap-2">
          <ZammadButton class="grow" theme="primary" @click="() => removeTicketStatus(props.status.id)"
            >Yes</ZammadButton
          >
          <ZammadButton class="grow" @click="() => (isRemovalConfirmationVisible = false)">No</ZammadButton>
        </div>
      </div>
    </template>
  </Dropdown>
</template>
