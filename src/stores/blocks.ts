import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { IBlocksRequest, IBlocksResponse, ICandle, IPrice } from '@/interfaces'
import { useCommonStore } from '@/stores/common'
import { baseGETRequest } from '@/functions'
import router from '@/router'

export const useBlocksStore = defineStore('blocksStore', () => {
  const query = ref<IBlocksRequest>({
    poolAddress: '',
    startingBlock: '',
    blocks: ''
  })
  const blocks = ref<IBlocksResponse>({
    success: true,
    error: '',
    poolInfo: {},
    blocks: []
  })

  const formatChartData = computed((): ICandle[] => {
    if (blocks.value.blocks.length === 0) return []
    const data = blocks.value
    const formatData: ICandle[] = []
    const loopLength: number =
      data.blocks[data.blocks.length - 1].blockNumber - data.blocks[0].blockNumber || 0
    let lastBlockNumber: number = data.blocks[0].blockNumber - 1
    let lastOpen: string = data.poolInfo.startingPrice
    let lastHigh: string = ''
    let lastLow: string = ''
    let lastClose: string = data.poolInfo.startingPrice

    let i = 0
    while (formatData.length - 1 !== loopLength) {
      lastBlockNumber++
      const prices: IPrice[] = []
      if (data.blocks[i].blockNumber === lastBlockNumber) {
        let high: number = 0,
          low: number = Infinity
        lastOpen = lastClose
        data.blocks[i].prices.forEach((price: IPrice, k: number): void => {
          if (+price.priceAfter > high) {
            lastHigh = price.priceAfter
            high = +price.priceAfter
          }
          if (+price.priceAfter < low) {
            lastLow = price.priceAfter
            low = +price.priceAfter
          }
          if (k === data.blocks[i].prices.length - 1) {
            lastClose = price.priceAfter
          }
          prices.push({
            ...price
          })
        })
        i++
        formatData.push({
          x: lastBlockNumber + '',
          y: [lastOpen, lastHigh, lastLow, lastClose],
          prices
        })
      } else {
        formatData.push({
          x: lastBlockNumber + '',
          y: [lastClose, lastClose, lastClose, lastClose],
          prices
        })
      }
    }
    return formatData
  })

  async function getBlocks(fields: IBlocksRequest): Promise<void | boolean> {
    const commonStore = useCommonStore()
    if (JSON.stringify(query.value) === JSON.stringify(fields)) {
      commonStore.setCurrentPage('blocks')
      return true
    }
    try {
      commonStore.setLoader(true)
      blocks.value.error = ''
      const response = await baseGETRequest(
        `http://g.cybara.io/api?poolAddress=${fields.poolAddress}&startingBlock=${fields.startingBlock}&blocks=${fields.blocks}`
      )
      commonStore.setCurrentPage('blocks')
      blocks.value = response
      query.value = fields
      router.push({ path: '/', query: fields })
    } catch (e) {
      console.error(e)
    } finally {
      commonStore.setLoader(false)
    }
  }

  return { query, blocks, formatChartData, getBlocks }
})
