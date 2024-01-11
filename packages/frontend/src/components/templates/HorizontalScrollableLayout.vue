<script setup lang="ts">
import { ref } from 'vue'

defineSlots<{
  default(): unknown
}>()

const element = ref<HTMLDivElement>()

defineExpose({
  element,
})
</script>

<template>
  <div ref="element" class="flex grow flex-row gap-8 overflow-auto md:p-8">
    <slot />
  </div>
</template>
