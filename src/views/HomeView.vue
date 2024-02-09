<script setup lang="ts">
import Pools from '@/components/Pools.vue'
import Chart from '@/components/Chart.vue'
import AppInfoBlock from '@/components/UI/AppInfoBlock.vue'
import { useCommonStore } from '@/stores/common'
import { usePoolsStore } from '@/stores/pools'
import { useBlocksStore } from '@/stores/blocks'
import type { IPool } from '@/interfaces'

const commonStore = useCommonStore()
const poolsStore = usePoolsStore()
const blocksStore = useBlocksStore()

function pickPool(pool: IPool): void {
  blocksStore.gotToBlocks({
    poolAddress: pool.Address,
    startingBlock: poolsStore.pools.block.toString() || '',
    blocks: '100'
  })
}

</script>

<template>
  <main>
    <Pools
      :pools="poolsStore.pools.pools"
      @pick-pool="pickPool"
      v-if="commonStore.currentPage === 'pools'"
    />
    <template
      v-if="commonStore.currentPage === 'blocks'"
    >
      <AppInfoBlock :json="blocksStore.blocks.poolInfo" :inline="true"/>
      <Chart
        :series="blocksStore.formatChartData"
      />
    </template>
  </main>
</template>

<style lang="scss">
.forms {
  display: flex;
  margin: 0 -20px 20px;
  .app-form {
    margin: 20px;
  }
  .divider {
    width: 2px;
    background: #808080;
  }
}
</style>
