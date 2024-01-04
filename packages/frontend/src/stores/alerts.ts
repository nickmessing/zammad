import { createId } from '@paralleldrive/cuid2'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_DURATION = 10_000

export enum AlertType {
  Information = 'information',
  Success = 'success',
  Error = 'error',
}

interface AlertCreateOptions {
  message: string | string[]
  type: AlertType
  duration?: number
}

interface Alert extends AlertCreateOptions {
  id: string
  createdAt: Date
  removeAlertTimer?: ReturnType<typeof setTimeout>
}
export const useAlertsStore = defineStore('alerts', () => {
  let pauseStartTime = -1
  const alerts = ref<Alert[]>([])

  function removeAlert(id: string) {
    const index = alerts.value.findIndex(alert => alert.id === id)
    if (index > -1) {
      alerts.value.splice(index, 1)
    }
  }
  function registerDelayedAlertRemoval(alert: Alert) {
    const dateDiff = Date.now() - alert.createdAt.getTime()

    return setTimeout(
      () => {
        removeAlert(alert.id)
      },
      (alert.duration ?? DEFAULT_DURATION) - dateDiff,
    )
  }
  function message(options: AlertCreateOptions) {
    const id = createId()
    const createdAt = new Date()

    const alert: Alert = {
      ...options,
      id,
      createdAt,
    }

    const removeAlertTimer = alert.duration === -1 ? undefined : registerDelayedAlertRemoval(alert)

    alerts.value.push({
      ...alert,
      removeAlertTimer,
    })
  }
  function pauseTimers() {
    pauseStartTime = Date.now()
    for (const alert of alerts.value) {
      if (alert.removeAlertTimer) {
        clearTimeout(alert.removeAlertTimer)
      }
    }
  }
  function resumeTimers() {
    const pauseEndTime = Date.now()
    const pauseDuration = pauseEndTime - pauseStartTime
    alerts.value = alerts.value.map(alert => ({
      ...alert,
      createdAt: new Date(alert.createdAt.getTime() + pauseDuration),
    }))

    for (const alert of alerts.value) {
      alert.removeAlertTimer = alert.duration === -1 ? undefined : registerDelayedAlertRemoval(alert)
    }
  }

  return {
    message,
    pauseTimers,
    resumeTimers,
    removeAlert,
    alerts,
  }
})
