<script setup lang="ts">
import AppInfoBlock from '@/components/UI/AppInfoBlock.vue'
import type { IPool } from '@/interfaces'

defineProps<{
  pools: IPool[]
}>()

const emits = defineEmits<{
  pickPool: any | IPool
}>()
</script>

<template>
  <div class="tx-hash-section">
    <AppInfoBlock
      v-for="pool in pools"
      :json="pool"
      :key="pool.Address"
      :clickable="true"
      @click="emits('pickPool', pool)"
    />
  </div>
</template>

<style scoped></style>
