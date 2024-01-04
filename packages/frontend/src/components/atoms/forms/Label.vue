<script setup lang="ts">
const slots = defineSlots<{
  default(): unknown
  label?(): unknown
}>()
</script>

<template>
  <label class="flex cursor-pointer flex-col items-start gap-2">
    <span v-if="slots.label" class="text-md">
      <slot name="label" />
    </span>
    <slot />
  </label>
</template>
