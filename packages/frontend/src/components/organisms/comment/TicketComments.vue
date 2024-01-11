<script setup lang="ts">
import SingleComment from '@/components/molecules/comment/SingleComment.vue'
import { useTicketCommentsQuery } from '@/generated/graphql'
import { COMMENTS_PER_PAGE } from '@/utils/constants'

const props = defineProps<{
  ticketId: string
}>()

const { result: ticketCommentsQueryResult } = useTicketCommentsQuery(() => ({
  ticketId: props.ticketId,
  first: COMMENTS_PER_PAGE,
  after: undefined,
}))
</script>

<template>
  <div class="flex flex-col gap-2 overflow-auto p-4 md:gap-4 md:p-8">
    <SingleComment
      v-for="comment in ticketCommentsQueryResult?.ticket?.comments.items"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>
