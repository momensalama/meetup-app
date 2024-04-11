<script setup lang="ts">
import type { AppButtonProps } from '@/types'

defineProps<AppButtonProps>()
</script>

<template>
  <button
    :class="`transition ${status ? 'danger' : ''}`"
    @click="method"
    :type="type"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background-color: white;
  color: #333;
  font-size: 1.2rem;
  border: 1px solid #333;

  &:disabled {
    background-color: #ccc;
    color: #666;
    border: 1px solid #666;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #333;
    color: white;
  }

  &.transition {
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  &.danger {
    background-color: #f00;
    color: white;
    border: 1px solid #f00;
  }
}
</style>
