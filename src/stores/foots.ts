import { defineStore } from 'pinia'
import { useCommonStore } from '@/stores/common'
import { ref } from 'vue'
import type { IFootRequest, IFootResponse } from '@/interfaces'

export const useFootsStore = defineStore('footsStore', () => {
  const tokensList: any = ref()
  const query = ref<IFootRequest>({
    token: '',
    size: '',
    human: true
  })
  const foots = ref<IFootResponse>()
  const error = ref<string>('')

  async function getTokensList() {
    const commonStore = useCommonStore()
    try {
      commonStore.setLoader(true)
      const response = await fetch(`http://g.cybara.io/m/all612.json`, {
        method: 'GET'
      })
      const json = await response.json()
      tokensList.value = json
    } catch (e) {
      console.error(e)
    } finally {
      commonStore.setLoader(false)
    }
  }

  async function getFoots(fields: IFootRequest): Promise<boolean> {
    const commonStore = useCommonStore()
    try {
      commonStore.setLoader(true)
      query.value = fields as IFootRequest
      error.value = ''
      const response = await fetch(
        `http://main.cybara.io/r?token=${fields.token}&size=${fields.size}&human=${fields.human}`,
        {
          method: 'GET'
        }
      )
      if (response.status !== 200) {
        throw await response.text()
      }
      const json = await response.json()
      foots.value = json
      return true
    } catch (e: any) {
      error.value = e
      return false
    } finally {
      commonStore.setLoader(false)
    }
  }

  return { tokensList, getTokensList, getFoots, query, foots, error }
})
