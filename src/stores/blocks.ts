import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { IBlocksRequest, IBlocksResponse, ICandle, IPrice } from '@/interfaces'
import { useCommonStore } from '@/stores/common'
import { baseGETRequest } from '@/functions'
import router from '@/router'
import type { LocationQuery } from 'vue-router'

export const useBlocksStore = defineStore('blocksStore', () => {
  const state = {
    query: <IBlocksRequest> {
      poolAddress: '',
      startingBlock: '',
      blocks: ''
    },
    blocks: <IBlocksResponse> {
      success: true,
      error: '',
      poolInfo: {
        poolAddress: '',
        token0: '',
        token1: '',
        ticker0: '',
        ticker1: '',
        decimals0: 0,
        decimals1: 0,
        poolVersion: '',
        startingPrice: '',
      },
      blocks: []
    }
  }

  const query = ref<IBlocksRequest>(state.query)
  const blocks = ref<IBlocksResponse>(state.blocks)

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

  async function getBlocks(fields: LocationQuery | IBlocksRequest): Promise<boolean> {
    const commonStore = useCommonStore()
    try {
      commonStore.setLoader(true)
      query.value = fields as IBlocksRequest
      blocks.value.error = ''
      const response = await baseGETRequest(
        `http://g.cybara.io/api?poolAddress=${fields.poolAddress}&startingBlock=${fields.startingBlock}&blocks=${fields.blocks}`
      )
      commonStore.setCurrentPage('blocks')
      blocks.value = response
      return true
    } catch (e: any) {
      blocks.value = e
      console.error(e)
      return false
    } finally {
      commonStore.setLoader(false)
    }
  }

  function gotToBlocks(query: IBlocksRequest) {
    router.push({ path: '/', query: {...query} })
  }

  function clearState() {
    query.value = state.query
    blocks.value = state.blocks
  }

  return { query, blocks, formatChartData, getBlocks, gotToBlocks, clearState }
})
