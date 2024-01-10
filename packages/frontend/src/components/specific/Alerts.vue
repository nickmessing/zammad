<script setup lang="ts">
import { AlertType, useAlertsStore } from '@/stores/alerts'

const alertsStore = useAlertsStore()
</script>

<template>
  <TransitionGroup
    name="fade-and-slide"
    tag="div"
    class="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col gap-4 py-8"
    @mouseenter="alertsStore.pauseTimers()"
    @mouseleave="alertsStore.resumeTimers()"
  >
    <div
      v-for="alert in alertsStore.alerts"
      :key="alert.id"
      :class="{
        'bg-green-300': alert.type === AlertType.Success,
        'bg-red-300': alert.type === AlertType.Error,
        'bg-blue-300': alert.type === AlertType.Information,
      }"
      class="flex w-96 flex-col gap-2 rounded-md bg-green-300 p-4"
      @close="alertsStore.removeAlert(alert.id)"
    >
      <template v-if="typeof alert.message === 'string'">
        <p>{{ alert.message }}</p>
      </template>
      <template v-else>
        <p v-for="(message, index) in alert.message" :key="index">
          {{ message }}
        </p>
      </template>
    </div>
  </TransitionGroup>
</template>
