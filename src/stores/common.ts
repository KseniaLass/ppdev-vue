import { defineStore } from 'pinia'
import { ref } from 'vue'

type Page = 'default' | 'pools' | 'blocks'

export const useCommonStore = defineStore('commonStore', () => {
  const showLoader = ref<boolean>(false)
  const currentPage = ref<Page>('default')

  function setLoader(value: boolean): void {
    showLoader.value = value
  }

  function setCurrentPage(page: Page): void {
    currentPage.value = page
  }

  return { showLoader, currentPage, setLoader, setCurrentPage}
})