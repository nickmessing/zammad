<script setup lang="ts">
import TimeAgo from '@/components/atoms/common/TimeAgo.vue'
import UserIndicator from '@/components/molecules/user/UserIndicator.vue'

import type { TicketComment } from '@/generated/graphql'
import type { ApolloPick } from '@/types/apollo'
const props = defineProps<{
  comment: ApolloPick<
    TicketComment,
    {
      comment: true
      createdAt: true
      author: {
        displayName: true
      }
    }
  >
}>()
</script>

<template>
  <article class="flex flex-col gap-2 rounded-lg bg-white p-6 text-base shadow">
    <header class="flex items-center justify-between">
      <p class="inline-flex items-center text-sm font-semibold text-gray-900">
        <UserIndicator :user="props.comment.author" />
      </p>
      <p class="text-sm text-gray-600">
        <TimeAgo :date="props.comment.createdAt" :formatOptions="{ year: 'numeric', month: 'short', day: 'numeric' }" />
      </p>
    </header>
    <p class="text-gray-500">
      {{ props.comment.comment }}
    </p>
  </article>
</template>
