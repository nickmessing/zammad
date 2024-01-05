<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    modelValue: string
    type?: 'text' | 'password'
    name?: string
    placeholder?: string
    isDisabled?: boolean
  }>(),
  {
    type: 'text',
    name: undefined,
    placeholder: undefined,
    isDisabled: false,
  },
)
const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    v-model="modelValue"
    :name="props.name"
    :placeholder="props.placeholder"
    :disabled="props.isDisabled"
    type="text"
    class="w-full cursor-text rounded-md border border-transparent p-2 outline-none focus:border-blue-300 active:border-blue-400 disabled:cursor-not-allowed disabled:bg-gray-200 group-active:border-blue-400"
    @focus="event => emit('focus', event)"
    @blur="event => emit('blur', event)"
    @keydown="event => emit('keydown', event)"
  />
</template>
