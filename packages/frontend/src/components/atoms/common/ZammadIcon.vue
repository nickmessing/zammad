<!-- Based on Pictogrammers/vue-icon -->

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    path: string
    size?: number
    viewBox?: string
    flip?: 'horizontal' | 'vertical' | 'both' | 'none'
    rotate?: number
  }>(),
  {
    size: 24,
    viewBox: '0 0 24 24',
    flip: 'none',
    rotate: 0,
  },
)

const styles = computed(() => ({
  '--sx': ['both', 'horizontal'].includes(props.flip) ? '-1' : '1',
  '--sy': ['both', 'vertical'].includes(props.flip) ? '-1' : '1',
  '--r': `${props.rotate}deg`,
}))
</script>

<template>
  <svg :width="props.size" :height="props.size" :viewBox="props.viewBox" :style="styles">
    <path :d="path" />
  </svg>
</template>

<style scoped lang="less">
svg {
  transform: rotate(var(--r, 0deg)) scale(var(--sx, 1), var(--sy, 1));

  path {
    fill: currentColor;
  }
}
</style>
