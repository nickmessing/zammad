<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: number
  min: number
  max: number
}>()
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    v-model.number="modelValue"
    :min="props.min"
    :max="props.max"
    class="h-4 appearance-none rounded p-1"
    type="range"
    name="hue"
  />
</template>
