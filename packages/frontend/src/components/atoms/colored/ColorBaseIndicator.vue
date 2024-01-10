<script setup lang="ts">
import { computed } from 'vue'

import type { ColorBase } from '@/generated/graphql'

const props = withDefaults(
  defineProps<{
    colorBase: ColorBase
    isFullWidth?: boolean
  }>(),
  {
    isFullWidth: false,
  },
)

const hue = computed(() => props.colorBase.hue)
const saturation = computed(() => props.colorBase.saturation)
</script>

<template>
  <div
    :class="{
      'w-4 rounded-full': !props.isFullWidth,
      rounded: props.isFullWidth,
    }"
    class="color-base-indicator h-4 rounded border shadow"
  />
</template>

<style scoped lang="less">
.color-base-indicator {
  --hue: calc(v-bind(hue) * 1deg);
  --saturation: calc(v-bind(saturation) * 1%);
  --lightness: 45%;

  background-color: hsl(var(--hue), var(--saturation), var(--lightness));
  border-color: hsl(var(--hue), var(--saturation), calc(var(--lightness) - 10%));
}
</style>
