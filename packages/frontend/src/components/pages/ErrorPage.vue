<script setup lang="ts">
interface Properties {
  title?: string
  message?: string
  statusCode?: number
}

const props = withDefaults(defineProps<Properties>(), {
  title: 'Not Found',
  message: "We're sorry, but this page doesn't exist.",
  statusCode: 404,
})
</script>

<template>
  <div>
    <h1>{{ `Error - ${props.statusCode}` }}</h1>
    <p>{{ props.message }}</p>
  </div>
</template>
