<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLoader from '@/components/UI/AppLoader.vue'
import { useCommonStore } from '@/stores/common'
import AppForm from '@/components/UI/AppForm.vue'
import { usePoolsStore } from '@/stores/pools'
import { useBlocksStore } from '@/stores/blocks'

const commonStore = useCommonStore()
const poolsStore = usePoolsStore()
const blocksStore = useBlocksStore()
</script>

<template>
  <header>
    <h1>PPDEV</h1>
  </header>
  <div class="forms">
    <AppForm
      :fields="poolsStore.query"
      :error-msg="poolsStore.pools.error"
      @submit="poolsStore.gotToPools($event)"
    ></AppForm>
    <div class="divider"></div>
    <AppForm
      :fields="blocksStore.query"
      :error-msg="blocksStore.blocks.error"
      @submit="blocksStore.gotToBlocks($event)"
    ></AppForm>
  </div>
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
