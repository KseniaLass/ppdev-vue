import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IPoolsRequest, IPoolsResponse } from '@/interfaces'
import { useCommonStore } from '@/stores/common'
import { baseGETRequest } from '@/functions'
import router from '@/router'
import { useBlocksStore } from '@/stores/blocks'
import type { LocationQuery } from 'vue-router'
export const usePoolsStore = defineStore('poolsStore', () => {

  const state = {
    query: <IPoolsRequest> {
      txHash: ''
    },
    pools: <IPoolsResponse> {
      success: true,
      error: '',
      txHash: '',
      pools: [],
      block: 0
    }
  }
  const query = ref<IPoolsRequest>(state.query)
  const pools = ref<IPoolsResponse>(state.pools)

  async function getPools(fields: LocationQuery | IPoolsRequest): Promise<boolean> {
    const commonStore = useCommonStore()
    const blocksStore = useBlocksStore()
    try {
      commonStore.setLoader(true)
      query.value = fields as IPoolsRequest
      pools.value.error = ''
      const response = await baseGETRequest(`http://g.cybara.io/detect?txHash=${fields.txHash}`)
      if (response.pools.length > 1) {
        commonStore.setCurrentPage('pools')
        pools.value = response
      } else {
        blocksStore.gotToBlocks({
          poolAddress: response.pools[0].Address,
          startingBlock: response.block.toString(),
          blocks: '100'
        })
      }
      return true
    } catch (e: any) {
      pools.value = e
      console.error(e)
      return false
    } finally {
      commonStore.setLoader(false)
    }
  }

  function gotToPools(query: IPoolsRequest) {
    router.push({path: '/', query: {txHash: query.txHash}})
  }

  function clearState() {
    query.value = state.query
    pools.value = state.pools
  }

  return { query, pools, getPools, gotToPools, clearState }
})