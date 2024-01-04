<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    target?: string
    type?: 'button' | 'submit' | 'reset'
    theme?: 'default' | 'primary' | 'nav'
    isActiveClassOnExactMatch?: boolean
    isDisabled?: boolean
  }>(),
  {
    to: undefined,
    href: undefined,
    target: '_blank',
    type: undefined,
    theme: 'default',
    isActiveClassOnExactMatch: false,
    isDisabled: false,
  },
)

defineSlots<{
  default(): unknown
}>()

const htmlElementName = computed(() => {
  if (props.to) {
    return RouterLink
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const classes = computed(() => {
  const list = ['rounded-md', 'px-3', 'py-2', 'text-sm', 'font-medium']

  if (props.theme === 'nav') {
    list.push('text-gray-300', 'hover:bg-gray-700', 'hover:text-white', 'active:bg-gray-900')
  }
  if (props.theme === 'primary') {
    list.push('text-white', 'bg-indigo-600', 'hover:bg-indigo-700', 'active:bg-indigo-800')
  }
  if (props.theme === 'default') {
    list.push('text-gray-700', 'bg-gray-100', 'hover:bg-gray-200', 'active:bg-gray-300')
  }

  if (props.isDisabled) {
    list.push('opacity-80', 'pointer-events-none')
  }

  return list
})

const activeClass = computed(() => {
  if (props.theme === 'nav') {
    return 'bg-gray-900 text-white'
  }

  return ''
})

const htmlElementAttributes = computed(() => {
  const attributes: Record<string, unknown> = {
    class: classes.value,
  }

  if (htmlElementName.value === RouterLink) {
    attributes.to = props.to

    if (props.isActiveClassOnExactMatch) {
      attributes.exactActiveClass = activeClass.value
    } else {
      attributes.activeClass = activeClass.value
    }
  }

  if (htmlElementName.value === 'a') {
    attributes.href = props.href
    attributes.target = props.target
  }

  if (htmlElementName.value === 'button') {
    attributes.type = props.type
    attributes.disabled = props.isDisabled
  }

  return attributes
})
</script>

<template>
  <Component :is="htmlElementName" v-bind="htmlElementAttributes">
    <slot />
  </Component>
</template>
