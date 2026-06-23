<template>
  <div>
    <h1>Nuxt Highlight Playground</h1>
    <button @click="triggerError">
      Trigger Error
    </button>
    <button @click="trackEvent">
      Track Event
    </button>
  </div>
</template>

<script setup>
const { $highlight } = useNuxtApp()

function triggerError() {
  throw new Error('Test error from playground')
}

function trackEvent() {
  $highlight?.track('button_clicked', { page: 'playground' })
}
</script>
