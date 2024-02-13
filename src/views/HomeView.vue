<script setup lang="ts">
import Pools from '@/components/AppPools.vue'
import Chart from '@/components/AppChart.vue'
import AppInfoBlock from '@/components/UI/AppInfoBlock.vue'
import { useCommonStore } from '@/stores/common'
import { usePoolsStore } from '@/stores/pools'
import { useBlocksStore } from '@/stores/blocks'
import type { IPool } from '@/interfaces'
import AppForm from '@/components/UI/AppForm.vue'

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
    <Pools
      :pools="poolsStore.pools.pools"
      @pick-pool="pickPool"
      v-show="commonStore.currentChartStage === 'pools'"
    />
    <div class="blocks" v-show="commonStore.currentChartStage === 'blocks'">
      <AppInfoBlock :json="blocksStore.blocks.poolInfo" :inline="true"/>
      <Chart
        :series="blocksStore.formatChartData"
      />
    </div>
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
