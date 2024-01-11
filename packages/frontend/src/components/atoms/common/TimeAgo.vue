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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
  },
)

const A_DAY_IN_MS = 1000 * 60 * 60 * 24

const asDate = computed(() => new Date(props.date))
const isMoreThanADayAgo = computed(() => asDate.value.getTime() < Date.now() - A_DAY_IN_MS)

const timeAgo = useTimeAgo(asDate, {
  showSecond: true,
  updateInterval: 1000,
})

const formattedDate = computed(() => new Intl.DateTimeFormat(undefined, props.formatOptions).format(asDate.value))

const asIsoString = computed(() => asDate.value.toISOString())
</script>

<template>
  <div v-if="isMoreThanADayAgo">
    <time :datetime="asIsoString">{{ formattedDate }}</time>
  </div>
  <Tooltip v-else>
    <time :datetime="asIsoString">{{ timeAgo }}</time>

    <template #popper> {{ formattedDate }} </template>
  </Tooltip>
</template>
