<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { cache } from '@/apollo/cache'
import { authorizationToken } from '@/apollo/links/authorization'
import ZammadButton from '@/components/atoms/common/ZammadButton.vue'
import ZammadHeading from '@/components/atoms/common/ZammadHeading.vue'
import TextInput from '@/components/atoms/forms/TextInput.vue'
import ZammadLabel from '@/components/atoms/forms/ZammadLabel.vue'
import CenterBoxLayout from '@/components/templates/CenterBoxLayout.vue'
import { useAuthenticateMutation } from '@/generated/graphql'

const router = useRouter()

const username = ref('')

const {
  mutate: authenticate,
  loading: isAuthenticateMutationLoading,
  onDone,
} = useAuthenticateMutation(() => ({
  variables: {
    username: username.value,
  },
}))

onDone(async ({ data }) => {
  if (data?.authenticate?.token) {
    authorizationToken.value = data.authenticate.token
    await cache.reset()
    await router.push({ name: 'Home' })
  }
})
</script>

<template>
  <CenterBoxLayout>
    <form class="flex flex-col gap-4" @submit.prevent="() => authenticate()">
      <ZammadHeading>Authentication</ZammadHeading>
      <ZammadLabel>
        <template #label> Username </template>
        <TextInput v-model="username" name="name" placeholder="JonDoe123" />
      </ZammadLabel>
      <span class="text-sm">
        Just a username, no password needed - because who needs extra security for a test task? It's like locking a door
        in an open field!
      </span>
      <ZammadButton :isDisabled="isAuthenticateMutationLoading" type="submit">Authenticate</ZammadButton>
    </form>
  </CenterBoxLayout>
</template>
