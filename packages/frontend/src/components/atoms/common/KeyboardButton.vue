<script lang="ts" setup>
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <kbd class="flex items-center justify-center rounded border-2 border-gray-500 p-1">
    <slot />
  </kbd>
</template>
