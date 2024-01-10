<script setup lang="ts">
import { mdiKeyboardEsc, mdiKeyboardReturn } from '@mdi/js'
import { useVModel } from '@vueuse/core'
import { computed, ref } from 'vue'

import KeyboardButton from '@/components/atoms/common/KeyboardButton.vue'
import ZammadIcon from '@/components/atoms/common/ZammadIcon.vue'
import TextInput from '@/components/atoms/forms/TextInput.vue'
import ZammadLabel from '@/components/atoms/forms/ZammadLabel.vue'

import type { UserProfileInformation } from '@/types/user'

const props = withDefaults(
  defineProps<{
    userProfileInformation: UserProfileInformation
    isUsernameEditable?: boolean
    isDisplayNameEditable?: boolean
  }>(),
  {
    isUsernameEditable: false,
    isDisplayNameEditable: false,
  },
)
const emit = defineEmits<{
  'update:userProfileInformation': [value: UserProfileInformation]
  'save:username': [value: string]
  'save:displayName': [value: string]
}>()

const userProfileInformation = useVModel(props, 'userProfileInformation', emit)

const dirtyUsername = ref<string>()
const username = computed({
  get: () => dirtyUsername.value ?? userProfileInformation.value.username,
  set: value => {
    dirtyUsername.value = value
  },
})
const isUsernameEdited = computed(
  () => username.value != undefined && username.value !== userProfileInformation.value.username,
)

const dirtyDisplayName = ref<string>()
const displayName = computed({
  get: () => dirtyDisplayName.value ?? userProfileInformation.value.displayName,
  set: value => {
    dirtyDisplayName.value = value
  },
})
const isDisplayNameEdited = computed(
  () => displayName.value != undefined && displayName.value !== userProfileInformation.value.displayName,
)

const isUsernameFocused = ref(false)
const isDisplayNameFocused = ref(false)

function saveUsername() {
  if (!isUsernameEdited.value) {
    return
  }

  userProfileInformation.value = {
    ...userProfileInformation.value,
    username: username.value,
  }
}
function resetUsername() {
  dirtyUsername.value = undefined
}

function saveDisplayName() {
  if (!isDisplayNameEdited.value) {
    return
  }

  userProfileInformation.value = {
    ...userProfileInformation.value,
    displayName: displayName.value,
  }
}
function resetDisplayName() {
  dirtyDisplayName.value = undefined
}
</script>

<template>
  <ZammadLabel>
    <template #label> Username </template>
    <TextInput
      v-model="username"
      :isDisabled="!props.isUsernameEditable"
      name="username"
      @focus="() => (isUsernameFocused = true)"
      @blur="() => (isUsernameFocused = false)"
      @keydown.enter="saveUsername"
      @keydown.esc="resetUsername"
    />
    <Transition name="fade-and-slide">
      <div v-if="isUsernameFocused && isUsernameEdited" class="flex flex-row gap-8 text-lg text-gray-700">
        <div class="flex flex-row items-center gap-2">
          <KeyboardButton>
            <ZammadIcon :path="mdiKeyboardReturn" :size="20" />
          </KeyboardButton>
          <div>Save</div>
        </div>
        <div class="flex flex-row items-center gap-2">
          <KeyboardButton>
            <ZammadIcon :path="mdiKeyboardEsc" :size="20" />
          </KeyboardButton>
          <div>Cancel</div>
        </div>
      </div>
    </Transition>
  </ZammadLabel>

  <ZammadLabel>
    <template #label> Display Name </template>
    <TextInput
      v-model="displayName"
      :isDisabled="!props.isDisplayNameEditable"
      name="displayName"
      @focus="() => (isDisplayNameFocused = true)"
      @blur="() => (isDisplayNameFocused = false)"
      @keydown.enter="saveDisplayName"
      @keydown.esc="resetDisplayName"
    />

    <Transition name="fade-and-slide">
      <div v-if="isDisplayNameFocused && isDisplayNameEdited" class="flex flex-row gap-8 text-lg text-gray-700">
        <div class="flex flex-row items-center gap-2">
          <KeyboardButton>
            <ZammadIcon :path="mdiKeyboardReturn" :size="20" />
          </KeyboardButton>
          <div>Save</div>
        </div>
        <div class="flex flex-row items-center gap-2">
          <KeyboardButton>
            <ZammadIcon :path="mdiKeyboardEsc" :size="20" />
          </KeyboardButton>
          <div>Cancel</div>
        </div>
      </div>
    </Transition>
  </ZammadLabel>
</template>
