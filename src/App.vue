<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLoader from '@/components/UI/AppLoader.vue'
import { useCommonStore } from '@/stores/common'

const commonStore = useCommonStore()
</script>

<template>
  <header>
    <h1>PPDEV</h1>
  </header>
  <RouterView />

  <AppLoader v-if="commonStore.showLoader" />
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
