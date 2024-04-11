<script setup lang="ts"></script>

<template>
  <section class="not-found_page">
    <div>
      <h1>Not Found page</h1>
      <p>Page not found. Go back to <router-link to="/">home</router-link></p>
    </div>
  </section>
</template>

<style scoped>
.not-found_page {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-block-start: 4rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
  }

  a {
    color: #333;
    text-decoration: underline;
    &:hover {
      color: #000;
    }
  }
}
</style>
