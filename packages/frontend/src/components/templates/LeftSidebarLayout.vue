<script setup lang="ts">
defineSlots<{
  default(): unknown
  sidebar(): unknown
}>()
</script>

<template>
  <div class="flex grow flex-col md:flex-row">
    <div class="flex w-full shrink-0 grow-0 flex-col gap-8 bg-slate-300 p-8 shadow-inner md:w-96">
      <slot name="sidebar" />
    </div>
    <div class="flex grow flex-col md:flex-row">
      <slot />
    </div>
  </div>
</template>
