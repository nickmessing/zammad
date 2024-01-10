<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    text: string
    size?: number
    colorBase?: { hue: number; saturation: number }
  }>(),
  {
    size: 32,
    colorBase: () => ({ hue: 213, saturation: 97 }),
  },
)

const size = computed(() => props.size)
const colorBase = computed(() => props.colorBase)
const hue = computed(() => colorBase.value.hue)
const saturation = computed(() => colorBase.value.saturation)
// Emojis are counted as two characters, so we need to convert the string to an array first
const isLongText = computed(() => [...props.text].length > 1)
</script>

<template>
  <div
    :class="{ 'long-text': isLongText }"
    class="circular-avatar flex items-center justify-center rounded-full shadow"
  >
    {{ props.text }}
  </div>
</template>

<style scoped lang="less">
.circular-avatar {
  --size: calc(v-bind(size) * 1px);
  --font-size: calc(var(--size) * 0.7);
  --line-height: calc(var(--size) * 0.9);
  --background-color: hsl(calc(v-bind(hue) * 1deg), calc(v-bind(saturation) * 1%), 40%);

  width: var(--size);
  height: var(--size);
  font-size: var(--font-size);
  line-height: var(--line-height);
  background-color: var(--background-color);
  color: white;

  &.long-text {
    --font-size: calc(var(--size) * 0.2);
    --line-height: calc(var(--size) * 0.5);
  }
}
</style>
