<script setup lang="ts">
import { mdiClose } from '@mdi/js'

import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import { AlertType } from '@/stores/alerts'

const props = defineProps<{
  type: AlertType
}>()
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    :class="{
      'bg-green-300': props.type === AlertType.Success,
      'bg-red-300': props.type === AlertType.Error,
      'bg-blue-300': props.type === AlertType.Information,
    }"
    class="relative flex w-96 flex-col gap-2 rounded-md p-4"
  >
    <ZammadIcon
      :path="mdiClose"
      :size="24"
      class="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-gray-700"
      @click="emit('close')"
    />
    <slot />
  </div>
</template>
