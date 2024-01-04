<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    modelValue: string
    type?: 'text' | 'password'
    name?: string
    placeholder?: string
  }>(),
  {
    type: 'text',
    name: undefined,
    placeholder: undefined,
  },
)
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    v-model="modelValue"
    :name="props.name"
    :placeholder="props.placeholder"
    type="text"
    class="w-full cursor-text rounded-md border border-transparent p-2 outline-none focus:border-blue-300 active:border-blue-400"
  />
</template>
