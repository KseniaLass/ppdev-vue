import { defineStore } from 'pinia'
import { ref } from 'vue'

type ChartStage = 'default' | 'pools' | 'blocks'

export const useCommonStore = defineStore('commonStore', () => {
  const showLoader = ref<boolean>(false)
  const currentChartStage = ref<ChartStage>('default')

  function setLoader(value: boolean): void {
    showLoader.value = value
  }

  function setCurrentChartStage(page: ChartStage): void {
    currentChartStage.value = page
  }

  return { showLoader, currentChartStage, setLoader, setCurrentChartStage}
})