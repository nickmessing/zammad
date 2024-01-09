<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { cache } from '@/apollo/cache'
import { authorizationToken } from '@/apollo/links/authorization'
import Button from '@/components/atoms/common/Button.vue'
import Heading from '@/components/atoms/common/Heading.vue'
import Label from '@/components/atoms/forms/Label.vue'
import TextInput from '@/components/atoms/forms/TextInput.vue'
import { useAuthenticateMutation } from '@/generated/graphql'

const router = useRouter()

const username = ref('')

const { mutate, loading, onDone } = useAuthenticateMutation(() => ({
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
  <div class="flex grow items-center justify-center">
    <form class="flex w-80 flex-col gap-4 rounded-lg bg-gray-200 p-4 shadow-md" @submit.prevent="() => mutate()">
      <Heading>Authentication</Heading>
      <Label>
        <template #label> Username </template>
        <TextInput v-model="username" name="name" placeholder="JonDoe123" />
      </Label>
      <span class="text-sm">
        Just a username, no password needed - because who needs extra security for a test task? It's like locking a door
        in an open field!
      </span>
      <Button :isDisabled="loading" type="submit">Authenticate</Button>
    </form>
  </div>
</template>
