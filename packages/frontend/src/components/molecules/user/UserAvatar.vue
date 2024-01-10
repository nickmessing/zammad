<script setup lang="ts">
import { computed } from 'vue'

import CircularAvatar from '@/components/atoms/common/CircularAvatar.vue'
import { getColorBaseFromString } from '@/utils/colorBase'

import type { User } from '@/generated/graphql'
import type { ApolloPick } from '@/types/apollo'

const props = withDefaults(
  defineProps<{
    user?: ApolloPick<
      User,
      {
        displayName: true
      }
    >
    size?: number
  }>(),
  {
    user: undefined,
    size: 32,
  },
)

const colorBase = computed(() => (props.user ? getColorBaseFromString(props.user.displayName) : undefined))
</script>

<template>
  <CircularAvatar :text="props.user ? props.user.displayName[0] : '🧑'" :size="props.size" :colorBase="colorBase" />
</template>
