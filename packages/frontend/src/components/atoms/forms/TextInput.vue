<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    type?: 'text' | 'password'
    name?: string
    placeholder?: string
    isDisabled?: boolean
    isTextarea?: boolean
  }>(),
  {
    type: 'text',
    name: undefined,
    placeholder: undefined,
    isDisabled: false,
    isTextarea: false,
  },
)
const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const modelValue = useVModel(props, 'modelValue', emit)

const tagName = computed(() => (props.isTextarea ? 'textarea' : 'input'))
</script>

<template>
  <Component
    :is="tagName"
    :value="modelValue"
    :name="props.name"
    :placeholder="props.placeholder"
    :disabled="props.isDisabled"
    :class="{
      'h-32 resize-none': props.isTextarea,
    }"
    type="text"
    class="w-full cursor-text rounded-md border border-transparent p-2 outline-none focus:border-blue-300 active:border-blue-400 disabled:cursor-not-allowed disabled:bg-gray-200 group-active:border-blue-400"
    @focus="(event: FocusEvent) => emit('focus', event)"
    @blur="(event: FocusEvent) => emit('blur', event)"
    @keydown="(event: KeyboardEvent) => emit('keydown', event)"
    @input="(event: InputEvent) => (modelValue = (event.target as HTMLInputElement | HTMLTextAreaElement).value)"
  />
</template>
