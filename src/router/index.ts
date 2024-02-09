import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { usePoolsStore } from '@/stores/pools'
import { useBlocksStore } from '@/stores/blocks'
import { useCommonStore } from '@/stores/common'
import type { IBlocksRequest, IPoolsRequest } from '@/interfaces'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

router.beforeEach(async (to) => {
  const poolsStore = usePoolsStore()
  const blocksStore = useBlocksStore()
  const commonStore = useCommonStore()
  poolsStore.clearState()
  blocksStore.clearState()
  if (to.query.txHash) {
    await poolsStore.getPools(to.query)
  } else if (to.query.poolAddress && to.query.startingBlock && to.query.blocks) {
    await blocksStore.getBlocks(to.query)
  } else {
    commonStore.setCurrentPage('default')
  }
  return true
})

export default router
