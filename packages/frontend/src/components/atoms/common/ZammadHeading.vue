<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    level?: 1 | 2 | 3 | 4 | 5 | 6
  }>(),
  {
    level: 1,
  },
)
defineSlots<{
  default(): unknown
}>()

const htmlElementName = computed(() => `h${props.level}`)
</script>

<template>
  <Component
    :is="htmlElementName"
    :class="{
      'text-2xl': props.level === 1,
      'text-xl': props.level === 2,
      'text-lg': props.level === 3,
      'text-base': props.level === 4,
      'text-sm': props.level === 5,
      'text-xs': props.level === 6,
    }"
  >
    <slot />
  </Component>
</template>
