<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

import ColorBaseIndicator from '@/components/atoms/colored/ColorBaseIndicator.vue'
import RangePicker from '@/components/atoms/forms/RangePicker.vue'

import type { ColorBase } from '@/generated/graphql'

const props = defineProps<{
  colorBase: ColorBase
}>()
const emit = defineEmits<{
  'update:colorBase': [value: ColorBase]
}>()

const colorBase = useVModel(props, 'colorBase', emit)

const hue = computed({
  get: () => colorBase.value.hue,
  set: value => (colorBase.value = { ...colorBase.value, hue: value }),
})
const saturation = computed({
  get: () => colorBase.value.saturation,
  set: value => (colorBase.value = { ...colorBase.value, saturation: value }),
})
</script>

<template>
  <div class="color-picker flex flex-col gap-2">
    <ColorBaseIndicator :colorBase="colorBase" isFullWidth />
    <RangePicker v-model="hue" :min="0" :max="360" class="hue-picker" />
    <RangePicker v-model="saturation" :min="0" :max="100" class="saturation-picker" />
  </div>
</template>

<style scoped lang="less">
.color-picker {
  --hue: calc(v-bind(hue) * 1deg);
  --saturation: calc(v-bind(saturation) * 1%);
  --lightness: 50%;

  .hue-picker {
    background: linear-gradient(
      to right,
      hsl(0deg, var(--saturation), var(--lightness)) 0%,
      hsl(30deg, var(--saturation), var(--lightness)) 8.33333%,
      hsl(60deg, var(--saturation), var(--lightness)) 16.66667%,
      hsl(90deg, var(--saturation), var(--lightness)) 25%,
      hsl(120deg, var(--saturation), var(--lightness)) 33.33333%,
      hsl(150deg, var(--saturation), var(--lightness)) 41.66667%,
      hsl(180deg, var(--saturation), var(--lightness)) 50%,
      hsl(210deg, var(--saturation), var(--lightness)) 58.33333%,
      hsl(240deg, var(--saturation), var(--lightness)) 66.66667%,
      hsl(270deg, var(--saturation), var(--lightness)) 75%,
      hsl(300deg, var(--saturation), var(--lightness)) 83.33333%,
      hsl(330deg, var(--saturation), var(--lightness)) 91.66667%,
      hsl(360deg, var(--saturation), var(--lightness)) 100%
    );
  }

  .saturation-picker {
    background: linear-gradient(
      to right,
      hsl(var(--hue), 0%, var(--lightness)) 0%,
      hsl(var(--hue), 10%, var(--lightness)) 10%,
      hsl(var(--hue), 20%, var(--lightness)) 20%,
      hsl(var(--hue), 30%, var(--lightness)) 30%,
      hsl(var(--hue), 40%, var(--lightness)) 40%,
      hsl(var(--hue), 50%, var(--lightness)) 50%,
      hsl(var(--hue), 60%, var(--lightness)) 60%,
      hsl(var(--hue), 70%, var(--lightness)) 70%,
      hsl(var(--hue), 80%, var(--lightness)) 80%,
      hsl(var(--hue), 90%, var(--lightness)) 90%,
      hsl(var(--hue), 100%, var(--lightness)) 100%
    );
  }
}
</style>
