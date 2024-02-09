import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IPoolsRequest, IPoolsResponse } from '@/interfaces'
import { useCommonStore } from '@/stores/common'
import { baseGETRequest } from '@/functions'
import router from '@/router'
import { useBlocksStore } from '@/stores/blocks'
export const usePoolsStore = defineStore('poolsStore', () => {

  const state = {
    query: <IPoolsRequest> {
      txHash: ''
    },
    pools: <IPoolsRequest> {
      success: true,
      error: '',
      txHash: '',
      pools: [],
      block: 0
    }
  }
  const query = ref<IPoolsRequest>(state.query)
  const pools = ref<IPoolsResponse>(state.pools)

  async function getPools(fields: IPoolsRequest): Promise<void | boolean> {
    const commonStore = useCommonStore()
    const blocksStore = useBlocksStore()
    try {
      commonStore.setLoader(true)
      pools.value.error = ''
      const response = await baseGETRequest(`http://g.cybara.io/detect?txHash=${fields.txHash}`)
      query.value = fields
      if (response.pools.length > 1) {
        commonStore.setCurrentPage('pools')
        pools.value = response
      } else {
        blocksStore.getBlocks({
          poolAddress: response.pools[0].Address,
          startingBlock: response.block.toString(),
          blocks: '100'
        })
      }
    } catch (e) {
        console.error(e);
    } finally {
      commonStore.setLoader(false)
    }
  }

  function gotToPools(query: IPoolsRequest) {
    router.push({path: '/', query: {txHash: query.txHash}})
  }

  function clearForm() {
    query.value = state.query
  }

  return { query, pools, getPools, gotToPools, clearForm }
})