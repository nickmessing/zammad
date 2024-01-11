import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useMeQuery } from '@/generated/graphql'

export const useUserStore = defineStore('user', () => {
  const { result, loading } = useMeQuery()

  const isAuthenticated = computed(() => !loading.value && !!result.value?.me)
  const isNotAuthenticated = computed(() => !loading.value && !result.value?.me)

  const userId = computed(() => result.value?.me?.id)
  const user = computed(() => result.value?.me)

  return {
    result,
    user,
    userId,
    isLoading: loading,
    isAuthenticated,
    isNotAuthenticated,
  }
})
