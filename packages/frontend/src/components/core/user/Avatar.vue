<script setup lang="ts">
import { computed } from 'vue'

import { useUserQuery } from '@/generated/graphql'
import { getColorBaseFromString } from '@/utils/colorBase'

const props = withDefaults(
  defineProps<{
    id: string
    size?: number
  }>(),
  {
    size: 32,
  },
)

const { result, loading, error } = useUserQuery(() => ({
  id: props.id,
}))

const content = computed(() =>
  loading.value ? 'Loading...' : error.value ? 'Error' : result.value?.user?.displayName[0] ?? '?',
)

const size = computed(() => props.size)
const colorBase = computed(() =>
  result.value?.user ? getColorBaseFromString(result.value.user.displayName) : { hue: 213, saturation: 97 },
)
const hue = computed(() => colorBase.value.hue)
const saturation = computed(() => colorBase.value.saturation)
</script>

<template>
  <div :class="{ 'long-text': loading || error }" class="user-avatar flex items-center justify-center rounded-full">
    {{ content }}
  </div>
</template>

<style scoped lang="less">
.user-avatar {
  --size: calc(v-bind(size) * 1px);
  --font-size: calc(var(--size) * 0.7);
  --line-height: calc(var(--size) * 0.9);
  --background-color: hsl(v-bind(hue), calc(v-bind(saturation) * 1%), 30%);

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
