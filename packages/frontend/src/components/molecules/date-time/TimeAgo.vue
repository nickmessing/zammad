<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { Tooltip } from 'floating-vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    date: Date | number | string
    formatOptions?: Intl.DateTimeFormatOptions
  }>(),
  {
    formatOptions: () => ({
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    }),
  },
)

const asDate = computed(() => new Date(props.date))

const timeAgo = useTimeAgo(asDate, {
  showSecond: true,
  updateInterval: 1000,
})

const formattedDate = computed(() => new Intl.DateTimeFormat(undefined, props.formatOptions).format(asDate.value))
</script>

<template>
  <Tooltip>
    <span>{{ timeAgo }}</span>

    <template #popper> {{ formattedDate }} </template>
  </Tooltip>
</template>
