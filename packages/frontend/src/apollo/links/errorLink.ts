import { onError } from '@apollo/client/link/error'

import { AlertType, useAlertsStore } from '@/stores/alerts'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  const alertsStore = useAlertsStore()

  if (graphQLErrors) {
    for (const { message } of graphQLErrors) {
      alertsStore.message({
        type: AlertType.Error,
        message: message.split('\n'),
      })
    }
  }
  if (networkError) {
    const message = networkError.message

    alertsStore.message({
      type: AlertType.Error,
      message,
    })
  }
})
