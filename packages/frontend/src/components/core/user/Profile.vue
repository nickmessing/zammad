<script setup lang="ts">
import { mdiKeyboardReturn, mdiKeyboardEsc } from '@mdi/js'
import { computed, ref, watch } from 'vue'

import { authorizationToken } from '@/apollo/links/authorization'
import Icon from '@/components/atoms/common/Icon.vue'
import KeyboardButton from '@/components/atoms/common/KeyboardButton.vue'
import Label from '@/components/atoms/forms/Label.vue'
import TextInput from '@/components/atoms/forms/TextInput.vue'
import Avatar from '@/components/core/user/Avatar.vue'
import { useUpdateDisplayNameMutation, useUserQuery } from '@/generated/graphql'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
  userId: string
}>()

const displayName = ref('')
const isDisplayNameFocused = ref(false)

const { result: userQueryResult, loading: isUserQueryLoading } = useUserQuery(() => ({
  userId: props.userId,
}))
const userStore = useUserStore()

const {
  mutate: updateDisplayName,
  loading: isUpdateDisplayNameMutationLoading,
  onDone,
} = useUpdateDisplayNameMutation(() => ({
  variables: {
    displayName: displayName.value,
  },
}))
onDone(({ data }) => {
  const newToken = data?.updateDisplayName?.token

  if (!newToken) {
    return
  }

  authorizationToken.value = newToken
})

const isKeyboardInstructionVisible = computed(
  () =>
    isDisplayNameFocused.value &&
    !isUserQueryLoading.value &&
    !userStore.isLoading &&
    userQueryResult.value?.user?.displayName !== displayName.value,
)
const isDisplayNameInputDisabled = computed(
  () =>
    isUserQueryLoading.value ||
    userStore.isLoading ||
    isUpdateDisplayNameMutationLoading.value ||
    userQueryResult.value?.user?.id !== userStore.userId,
)

watch(
  () => userQueryResult.value?.user?.displayName,
  value => {
    displayName.value = value ?? ''
  },
  { immediate: true },
)

function resetDisplayName() {
  displayName.value = userQueryResult.value?.user?.displayName ?? ''
}
function saveDisplayName() {
  void updateDisplayName()
}
</script>

<template>
  <Avatar v-if="userQueryResult?.user?.id" :userId="userQueryResult.user.id" :size="320" />

  <div v-if="userQueryResult?.user" class="flex flex-col gap-4">
    <Label>
      <template #label> Username </template>
      <TextInput :modelValue="userQueryResult.user.username ?? ''" name="username" isDisabled />
    </Label>

    <Label>
      <template #label> Display Name </template>
      <TextInput
        v-model="displayName"
        :isDisabled="isDisplayNameInputDisabled"
        name="displayName"
        @focus="() => (isDisplayNameFocused = true)"
        @blur="() => (isDisplayNameFocused = false)"
        @keydown.esc="resetDisplayName"
        @keydown.enter="saveDisplayName"
      />

      <Transition name="fade-and-slide">
        <div v-if="isKeyboardInstructionVisible" class="flex flex-row gap-8 text-lg text-gray-700">
          <div class="flex flex-row items-center gap-2">
            <KeyboardButton>
              <Icon :path="mdiKeyboardReturn" :size="20" />
            </KeyboardButton>
            <div>Save</div>
          </div>
          <div class="flex flex-row items-center gap-2">
            <KeyboardButton>
              <Icon :path="mdiKeyboardEsc" :size="20" />
            </KeyboardButton>
            <div>Cancel</div>
          </div>
        </div>
      </Transition>
    </Label>
  </div>
</template>
