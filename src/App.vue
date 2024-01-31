<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>PPDEV</h1>
  </header>
  <RouterView />
</template>

<style scoped>
  h1 {
    margin: 0;
    padding: 0;
  }
  header {
    margin-bottom: 20px;
  }
</style>
