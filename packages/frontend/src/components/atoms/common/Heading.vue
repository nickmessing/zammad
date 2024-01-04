<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <h2 class="text-2xl">
    <slot />
  </h2>
</template>
