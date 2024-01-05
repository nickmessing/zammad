<script setup lang="ts">
const slots = defineSlots<{
  default(): unknown
  label?(): unknown
}>()
</script>

<template>
  <label class="group flex cursor-pointer select-none flex-col items-start gap-2">
    <span v-if="slots.label" class="text-base">
      <slot name="label" />
    </span>
    <slot />
  </label>
</template>
