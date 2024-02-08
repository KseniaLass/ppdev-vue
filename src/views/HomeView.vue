<script setup lang="ts">
import AppForm from '@/components/UI/AppForm.vue'
import type {
  ICandle,
  IChartRequest,
  IChartResponse,
  IHashRequest,
  IHashResponse, IPool, IPoolInfo,
  IPrice
} from '@/interfaces'
import { ref } from 'vue'
import { baseGETRequest, formatChartData } from '@/functions'
import AppLoader from '@/components/UI/AppLoader.vue'
import TxHashSection from '@/components/sections/TxHashSection.vue'
import ChartSection from '@/components/sections/ChartSection.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import AppInfoBlock from '@/components/UI/AppInfoBlock.vue'
import { useCommonStore } from '@/stores/common'

const $route = useRoute()

// TxHash data
const txHashFormFields = ref([
  {
    value: '',
    label: 'txHash',
    name: 'txHash',
    required: true
  }
])
const txHashFormError = ref('')
const txHashResponse = ref<IHashResponse>()

// Chart data
const chartFormFields = ref([
  {
    value: '',
    label: 'poolAddress',
    name: 'poolAddress',
    required: true
  },
  {
    value: '',
    label: 'startingBlock',
    name: 'startingBlock',
    required: true
  },
  {
    value: '',
    label: 'blocks',
    name: 'blocks',
    required: true
  }
])
const chartFormError = ref('')
const chartData = ref([])
const poolInfo = ref<IPoolInfo>()

// Common state

const commonStore = useCommonStore()

// Functions
async function generateHash(query: IHashRequest): Promise<void> {
  try {
    beforeRequest()
    const response: IHashResponse = await baseGETRequest(
      `http://g.cybara.io/detect?txHash=${query.txHash}`
    )
    if (response.pools.length > 1) {
      commonStore.setCurrentPage('txHash')
      txHashResponse.value = response
      setDataToHashForm(query)
      router.push({path: '/', query: {txHash: query.txHash}})
    } else {
      generateChart({
        poolAddress: response.pools[0].Address,
        startingBlock: response.block.toString(),
        blocks: '100'
      })
    }
  } catch (e: any) {
    console.error(e)
    txHashFormError.value = e.error
  } finally {
    commonStore.setLoader(false)
  }
}

async function generateChart(query: IChartRequest): Promise<void> {
  try {
    beforeRequest()
    const response: IChartResponse = await baseGETRequest(
      `http://g.cybara.io/api?poolAddress=${query.poolAddress}&startingBlock=${query.startingBlock}&blocks=${query.blocks}`
    )
    commonStore.setCurrentPage('chart')
    chartData.value = formatChartData(response)
    poolInfo.value = response.poolInfo
    setDataToChartForm(query)
    router.push({path: '/', query})
  } catch (e: any) {
    console.error(e)
    chartFormError.value = e.error
  } finally {
    commonStore.setLoader(false)
  }
}

function beforeRequest(): void {
  commonStore.setLoader(true)
  txHashFormError.value = ''
  chartFormError.value = ''
}

function pickPool(pool: IPool): void {
  generateChart({
    poolAddress: pool.Address,
    startingBlock: txHashResponse.value?.block.toString() || '',
    blocks: '100'
  })
}

function setDataToHashForm(data: IHashRequest): void {
  txHashFormFields.value[0].value = data.txHash
}
function setDataToChartForm(data: IChartRequest): void {
  chartFormFields.value[0].value = data.poolAddress
  chartFormFields.value[1].value = data.startingBlock
  chartFormFields.value[2].value = data.blocks
}

function checkQuery () {
  if ($route.query.txHash) {
    generateHash($route.query)
  } else if ($route.query.poolAddress && $route.query.startingBlock && $route.query.blocks) {
    generateChart($route.query)
  }
}

checkQuery()

</script>

<template>
  <main>
    <div class="forms">
      <AppForm
        :fields="txHashFormFields"
        :error-msg="txHashFormError"
        @submit="generateHash($event)"
      ></AppForm>
      <div class="divider"></div>
      <AppForm
        :fields="chartFormFields"
        :error-msg="chartFormError"
        @submit="generateChart($event)"
      ></AppForm>
    </div>
    <AppLoader v-if="commonStore.showLoader" />
    <TxHashSection
      :pools="txHashResponse.pools"
      @pick-pool="pickPool"
      v-if="commonStore.currentPage === 'txHash'"
    />
    <template
      v-if="commonStore.currentPage === 'chart'"
    >
      <AppInfoBlock :json="poolInfo"/>
      <ChartSection
        :series="chartData"
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
