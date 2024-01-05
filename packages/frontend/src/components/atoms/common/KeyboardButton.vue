<script lang="ts" setup>
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <div class="flex items-center justify-center rounded border-2 border-gray-500 p-1">
    <slot />
  </div>
</template>
