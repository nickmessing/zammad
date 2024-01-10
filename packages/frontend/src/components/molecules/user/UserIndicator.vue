<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { type User } from '@/generated/graphql'

import UserAvatar from './UserAvatar.vue'

import type { ApolloPick } from '@/types/apollo'

const props = withDefaults(
  defineProps<{
    user?: ApolloPick<
      User,
      {
        displayName: true
      }
    >
    noUserMessage?: string
    isClickDisabled?: boolean
  }>(),
  {
    user: undefined,
    noUserMessage: 'No user',
    isClickDisabled: false,
  },
)
defineSlots<{
  default(): unknown
}>()

const elementName = computed(() => (props.isClickDisabled || props.user == undefined ? 'div' : RouterLink))
const extraParameters = computed(() =>
  props.isClickDisabled || props.user == undefined ? {} : { to: { name: 'User', params: { id: props.user.id } } },
)

const displayName = computed(() => (props.user ? props.user.displayName ?? '' : props.noUserMessage))
</script>

<template>
  <Component
    :is="elementName"
    v-if="displayName"
    class="flex grow flex-row items-center gap-2"
    v-bind="extraParameters"
  >
    <UserAvatar :user="props.user" class="shrink-0" />
    <div class="shrink-0">
      {{ displayName }}
    </div>
    <div class="grow" />
    <div class="shrink-0">
      <slot />
    </div>
  </Component>
</template>
