<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <div class="flex flex-col gap-4 rounded bg-slate-50 p-4 shadow-xl">
    <slot />
  </div>
</template>
