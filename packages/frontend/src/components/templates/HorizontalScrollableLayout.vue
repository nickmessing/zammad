<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <div class="flex grow flex-row gap-8 overflow-auto p-8">
    <slot />
  </div>
</template>
