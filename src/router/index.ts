import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { usePoolsStore } from '@/stores/pools'
import { useBlocksStore } from '@/stores/blocks'
import { useCommonStore } from '@/stores/common'

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
  poolsStore.clearError()
  blocksStore.clearError()
  if (to.query.txHash) {
    const result = await poolsStore.getPools(to.query)
    if (result) blocksStore.clearForm()
  } else if (to.query.poolAddress && to.query.startingBlock && to.query.blocks) {
    const result = await blocksStore.getBlocks(to.query)
    if (result) poolsStore.clearForm()
  } else {
    blocksStore.clearForm()
    poolsStore.clearForm()
    commonStore.setCurrentPage('default')
  }
  return true
})

export default router
