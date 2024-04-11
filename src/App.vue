<script setup lang="ts">
import AppProtectedViews from './components/AppProtectedViews.vue'
import AppSpinner from './ui/AppSpinner.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <AppProtectedViews />
    </template>
    <template #fallback>
      <AppSpinner />
    </template>
  </Suspense>
</template>
