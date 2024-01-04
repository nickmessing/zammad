import { AlertType, useAlertsStore } from '@/stores/alerts'

import type { UseMutationReturn } from '@vue/apollo-composable'

type OnErrorFunction = UseMutationReturn<unknown, unknown>['onError']

export function useRegisterErrorHandler(onError: OnErrorFunction) {
  const alertsStore = useAlertsStore()

  onError(error => {
    alertsStore.message({
      type: AlertType.Error,
      message: error.message,
    })
  })
}
