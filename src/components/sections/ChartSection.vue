<script setup lang="ts">

import type { ICandle } from '@/interfaces'
import { ref } from 'vue'

const props = defineProps<{
  series: ICandle[]
}>()

const chartData = ref([{
  data: [
    {
      x: 1538856000000,
      y: [51.98, 56.29, 51.59, 53.85]
    },
    {
      x: 1538856900000,
      y: [53.66, 54.99, 51.35, 52.95]
    }
  ]
}])
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
</script>

<template>
  <div class="chart-section">
    <apexchart
      class="chart"
      type="candlestick"
      :options="options"
      :series="[{data: series}]"
      height="500"
      width="100%"
    ></apexchart>
  </div>
</template>

<style lang="scss">
.chart-section {
  margin: 0 -20px;
}
.chart {
  width: 100%;
  .apexcharts-toolbar {
    right: 30px !important;
  }
}
</style>
