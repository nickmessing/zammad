<script setup lang="ts">
defineSlots<{
  default?(): void
  header?(): void
  additional?(): void
}>()
</script>

<template>
  <slot name="header" />
  <main class="relative flex grow overflow-hidden">
    <div class="flex grow overflow-auto">
      <slot />
    </div>
    <slot name="additional" />
  </main>
</template>
