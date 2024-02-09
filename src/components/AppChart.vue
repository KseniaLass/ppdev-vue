<script setup lang="ts">
import type { ICandle, IPrice } from '@/interfaces'
import { ref } from 'vue'
import AppInfoBlock from '@/components/UI/AppInfoBlock.vue'

defineProps<{
  series: ICandle[]
}>()

const pricesInfo = ref<IPrice[]>([])

const options = {
  chart: {
    id: 'ppdev-chart',
    toolbar: {
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
        customIcons: []
      }
    }
  }
}

// @ts-ignore
function clickHandler(_: Event, { w }, { seriesIndex, dataPointIndex }): void {
  const candle = w.config.series[seriesIndex].data[dataPointIndex]
  pricesInfo.value = candle.prices
}
</script>

<template>
  <div class="chart-section">
    <apexchart
      class="chart-section__chart"
      type="candlestick"
      :options="options"
      :series="[{ data: series }]"
      height="500"
      @marker-click="clickHandler"
    ></apexchart>
    <div class="chart-section__blocks">
      <AppInfoBlock v-for="(price, i) in pricesInfo" :json="price" :key="i"/>
    </div>
  </div>
</template>

<style lang="scss">
.chart-section {
  margin-left: -20px;
  display: flex;
  &__chart {
    width: 75%;
    margin-right: 30px;
    * {
      font-family: Roboto, sans-serif !important;
    }
    .apexcharts-tooltip-candlestick {
      color: #202020 !important;
    }
  }
  &__blocks {
    width: 25%;
  }
}
</style>
