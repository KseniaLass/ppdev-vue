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

router.beforeEach((to) => {
  console.log('dddd')
  const poolsStore = usePoolsStore()
  const blocksStore = useBlocksStore()
  const commonStore = useCommonStore()
  if (to.query.txHash) {
    poolsStore.getPools(to.query)
  } else if (to.query.poolAddress && to.query.startingBlock && to.query.blocks) {
    blocksStore.getBlocks(to.query)
  } else {
    commonStore.setCurrentPage('default')
  }
  return true
})

export default router
