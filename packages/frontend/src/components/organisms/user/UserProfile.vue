<script setup lang="ts">
import { computed } from 'vue'

import { cache } from '@/apollo/cache'
import { authorizationToken } from '@/apollo/links/authorization'
import UserAvatar from '@/components/molecules/user/UserAvatar.vue'
import UserProfileForm from '@/components/molecules/user/UserProfileForm.vue'
import { useUpdateDisplayNameMutation, useUserQuery } from '@/generated/graphql'
import { useUserStore } from '@/stores/user'

import type { UserProfileInformation } from '@/types/user'

const props = defineProps<{
  userId: string
}>()

const { result: userQueryResult } = useUserQuery(() => ({
  userId: props.userId,
}))
const userStore = useUserStore()

const {
  mutate: updateDisplayName,
  loading: isUpdateDisplayNameMutationLoading,
  onDone,
} = useUpdateDisplayNameMutation()
onDone(async ({ data }) => {
  const newToken = data?.updateDisplayName?.token

  if (!newToken) {
    return
  }

  authorizationToken.value = newToken
  await cache.reset()
})

const userProfileInformation = computed<UserProfileInformation | undefined>({
  get: () =>
    userQueryResult.value?.user
      ? {
          username: userQueryResult.value.user.username,
          displayName: userQueryResult.value.user.displayName,
        }
      : undefined,
  set: value => {
    if (value == undefined) {
      return
    }

    void updateDisplayName({ displayName: value?.displayName })
  },
})
</script>

<template>
  <UserAvatar v-if="userQueryResult?.user" :user="userQueryResult.user" :size="320" />

  <div v-if="userProfileInformation && userQueryResult?.user" class="flex flex-col gap-4">
    <UserProfileForm
      v-model:userProfileInformation="userProfileInformation"
      :isDisplayNameEditable="
        userStore.isAuthenticated && userStore.userId === userQueryResult.user.id && !isUpdateDisplayNameMutationLoading
      "
    />
  </div>
</template>
