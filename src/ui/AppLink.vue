<script setup lang="ts">
import type { AppLinkProps } from '@/types'

defineProps<AppLinkProps>()
</script>

<template>
  <router-link :to="`${path}`" class="transition">{{ text }}</router-link>
</template>

<style scoped>
a {
  background-color: white;
  color: #333;
  font-size: 1.2rem;
  border: 1px solid #333;
  display: block;
  width: fit-content;
  padding: 0.5rem 1rem;

  &:hover,
  &:focus {
    background-color: #333;
    color: white;
    text-decoration: underline;
  }
}
</style>
