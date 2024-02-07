<script setup lang="ts">
import AppForm from '@/components/UI/AppForm.vue'
import type {
  ICandle,
  IChartRequest,
  IChartResponse,
  IHashRequest,
  IHashResponse, IPool,
  IPrice
} from '@/interfaces'
import { ref } from 'vue'
import { baseGETRequest } from '@/functions'
import AppLoader from '@/components/UI/AppLoader.vue'
import TxHashSection from '@/components/sections/TxHashSection.vue'
import ChartSection from '@/components/sections/ChartSection.vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const $route = useRoute()

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
const chartData = ref([])

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
const showLoader = ref(false)
const currentSection = ref('')
async function generateHash(query: IHashRequest): Promise<void> {
  try {
    beforeRequest()
    const response: IHashResponse = await baseGETRequest(
      `http://g.cybara.io/detect?txHash=${query.txHash}`
    )
    if (response.pools.length > 1) {
      currentSection.value = 'txHash'
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
    showLoader.value = false
  }
}

async function generateChart(query: IChartRequest): Promise<void> {
  try {
    beforeRequest()
    const response: IChartResponse = await baseGETRequest(
      `http://g.cybara.io/api?poolAddress=${query.poolAddress}&startingBlock=${query.startingBlock}&blocks=${query.blocks}`
    )
    currentSection.value = 'chart'
    chartData.value = formatChartData(response)
    setDataToChartForm(query)
    router.push({path: '/', query})
  } catch (e: any) {
    console.error(e)
    chartFormError.value = e.error
  } finally {
    showLoader.value = false
  }
}

function beforeRequest(): void {
  showLoader.value = true
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

function formatChartData(data: IChartResponse): ICandle[] {
  let formatData: ICandle[] = [];
  let loopLength: number = data.blocks[data.blocks.length - 1].blockNumber - data.blocks[0].blockNumber;
  let lastBlockNumber: number = data.blocks[0].blockNumber - 1;
  let lastOpen: string = data.poolInfo.startingPrice;
  let lastHigh: string = '';
  let lastLow: string = '';
  let lastClose: string = data.poolInfo.startingPrice;

  let i = 0;
  while (formatData.length - 1 !== loopLength) {
    lastBlockNumber++;
    let prices: IPrice[] = [];
    if (data.blocks[i].blockNumber === lastBlockNumber) {
      let high: number = 0,
        low: number = Infinity;
      lastOpen = lastClose;
      data.blocks[i].prices.forEach((price: IPrice, k: number): void => {
        if (+price.priceAfter > high) {
          lastHigh = price.priceAfter
          high = +price.priceAfter;
        }
        if (+price.priceAfter < low) {
          lastLow = price.priceAfter
          low = +price.priceAfter;
        }
        if (k === data.blocks[i].prices.length - 1) {
          lastClose = price.priceAfter;
        }
        prices.push({
          ...price
        })
      });
      i++;
      formatData.push({
        x: lastBlockNumber + '',
        y: [lastOpen, lastHigh, lastLow, lastClose],
        prices
      });
    } else {
      formatData.push({
        x: lastBlockNumber + '',
        y: [lastClose, lastClose, lastClose, lastClose],
        prices
      });
    }
  }
  return formatData;
}


if ($route.query.txHash) {
  generateHash($route.query)
} else if ($route.query.poolAddress && $route.query.startingBlock && $route.query.blocks) {
  generateChart($route.query)
}

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
    <AppLoader v-if="showLoader" />
    <TxHashSection
      :pools="txHashResponse.pools"
      @pick-pool="pickPool"
      v-if="currentSection === 'txHash'"
    />
    <ChartSection
      v-if="currentSection === 'chart'"
      :series="chartData"
    />
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
