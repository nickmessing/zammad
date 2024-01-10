<script setup lang="ts">
defineSlots<{
  default(): unknown
  sidebar(): unknown
}>()
</script>

<template>
  <div class="flex grow flex-row">
    <div class="flex w-96 shrink-0 grow-0 flex-col gap-8 bg-slate-300 p-8 shadow-inner">
      <slot name="sidebar" />
    </div>
    <div class="flex grow flex-row gap-8 p-8">
      <slot />
    </div>
  </div>
</template>
