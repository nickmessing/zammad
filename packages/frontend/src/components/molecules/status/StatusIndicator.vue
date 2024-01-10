<script setup lang="ts">
import ColorBaseIndicator from '@/components/atoms/colored/ColorBaseIndicator.vue'

import type { TicketStatus } from '@/generated/graphql'
import type { ApolloPick } from '@/types/apollo'

const props = withDefaults(
  defineProps<{
    status: ApolloPick<
      TicketStatus,
      {
        name: true
        colorBase: {
          hue: true
          saturation: true
        }
      }
    >
    isClickable?: boolean
  }>(),
  {
    isClickable: false,
  },
)
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <div
    :class="{ 'cursor-pointer': props.isClickable }"
    class="flex flex-row items-center gap-2"
    @click="event => emit('click', event)"
  >
    <ColorBaseIndicator :colorBase="props.status.colorBase" />
    <div>
      {{ props.status.name }}
    </div>
  </div>
</template>
