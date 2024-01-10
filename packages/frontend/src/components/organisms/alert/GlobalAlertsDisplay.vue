<script setup lang="ts">
import ZammadAlert from '@/components/molecules/alert/ZammadAlert.vue'
import { useAlertsStore } from '@/stores/alerts'

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
    <ZammadAlert
      v-for="alert in alertsStore.alerts"
      :key="alert.id"
      :type="alert.type"
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
    </ZammadAlert>
  </TransitionGroup>
</template>
