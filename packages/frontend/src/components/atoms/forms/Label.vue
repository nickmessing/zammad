<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isNoPointerCursor?: boolean
  }>(),
  {
    isNoPointerCursor: false,
  },
)
const slots = defineSlots<{
  default(): unknown
  label?(): unknown
}>()
</script>

<template>
  <label
    :class="{ 'cursor-pointer': !props.isNoPointerCursor }"
    class="group flex select-none flex-col items-start gap-2"
  >
    <span v-if="slots.label" class="text-base">
      <slot name="label" />
    </span>
    <slot />
  </label>
</template>
