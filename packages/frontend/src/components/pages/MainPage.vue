<script setup lang="ts">
import { RouterView } from 'vue-router'

import GlobalAlertsDisplay from '@/components/organisms/alert/GlobalAlertsDisplay.vue'
import ZammadHeader from '@/components/organisms/common/ZammadHeader.vue'
import LayoutMain from '@/components/templates/LayoutMain.vue'
</script>

<template>
  <LayoutMain>
    <template #header>
      <ZammadHeader />
    </template>
    <template #additional>
      <GlobalAlertsDisplay />
    </template>
    <RouterView />
  </LayoutMain>
</template>
