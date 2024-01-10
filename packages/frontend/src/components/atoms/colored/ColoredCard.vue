<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

import type { ColorBase } from '@/generated/graphql'

const props = defineProps<{
  colorBase: ColorBase
  to?: RouteLocationRaw
}>()
defineSlots<{
  default(): unknown
}>()

const hue = computed(() => props.colorBase.hue ?? 0)
const saturation = computed(() => props.colorBase.saturation ?? 0)

const htmlElementName = computed(() => (props.to ? RouterLink : 'div'))
</script>

<template>
  <Component
    :is="htmlElementName"
    :to="props.to"
    class="colored-card flex flex-col gap-2 rounded border-2 p-2 text-left shadow transition-all hover:shadow-md"
  >
    <slot />
  </Component>
</template>

<style scoped lang="less">
.colored-card {
  --hue: v-bind(hue);
  --saturation: v-bind(saturation);
  --lightness: 50%;

  border-color: hsl(calc(var(--hue) * 1deg), calc(var(--saturation) * 1%), var(--lightness));
  background-color: hsl(calc(var(--hue) * 1deg), calc(var(--saturation) * 1%), calc(var(--lightness) * 0.03 + 97%));

  &:hover {
    --lightness: 40%;
  }

  &:active {
    --lightness: 30%;
  }
}
</style>
