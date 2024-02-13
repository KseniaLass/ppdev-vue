import { defineStore } from 'pinia'
import { useCommonStore } from '@/stores/common'
import { baseGETRequest } from '@/functions'

export const useFootsStore = defineStore('footsStore', () => {
  let tokensList: any = [];

  async function getTokensList() {
    const commonStore = useCommonStore()
    try {
      commonStore.setLoader(true)
      const response = await fetch(`http://g.cybara.io/m/all612.json`, {
        method: 'GET',
      });
      const json = await response.json();
      tokensList = json
    } catch (e) {
      console.error(e);
    } finally {
      commonStore.setLoader(false)
    }
  }

  return {tokensList, getTokensList}
})