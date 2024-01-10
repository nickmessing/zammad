<script setup lang="ts">
defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <div class="flex grow items-center justify-center">
    <div class="flex w-80 flex-col gap-4 rounded-lg bg-gray-200 p-4 shadow-md">
      <slot />
    </div>
  </div>
</template>
