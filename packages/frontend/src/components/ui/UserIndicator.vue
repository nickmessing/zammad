<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useUserQuery } from '@/generated/graphql'

import Avatar from '../core/user/Avatar.vue'

const props = withDefaults(
  defineProps<{
    userId?: string
    noUserMessage?: string
    isClickDisabled?: boolean
  }>(),
  {
    userId: '',
    noUserMessage: 'No user',
    isClickDisabled: false,
  },
)
defineSlots<{
  default(): unknown
}>()

const { result: userQueryResult } = useUserQuery(
  () => ({
    userId: props.userId,
  }),
  () => ({
    enabled: Boolean(props.userId),
  }),
)

const elementName = computed(() => (props.isClickDisabled ? 'div' : RouterLink))
const extraParameters = computed(() =>
  props.isClickDisabled ? {} : { to: { name: 'User', params: { id: userQueryResult.value?.user?.id } } },
)

const displayName = computed(() =>
  props.userId ? userQueryResult.value?.user?.displayName ?? '' : props.noUserMessage,
)
</script>

<template>
  <Component
    :is="elementName"
    v-if="displayName"
    class="flex flex-grow flex-row items-center gap-2"
    v-bind="extraParameters"
  >
    <Avatar :userId="props.userId" class="flex-shrink-0" />
    <div class="flex-shrink-0">
      {{ displayName }}
    </div>
    <div class="flex-grow" />
    <div class="flex-shrink-0">
      <slot />
    </div>
  </Component>
</template>
