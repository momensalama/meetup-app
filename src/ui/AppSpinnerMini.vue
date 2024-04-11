<template>
  <div class="spinner-mini">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner-mini {
  width: fit-content;
}

.spinner {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
