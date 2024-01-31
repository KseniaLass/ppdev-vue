<script setup lang="ts">
import AppForm from '@/components/UI/AppForm.vue'
import type { IChartRequest, IChartResponse, IHashRequest, IHashResponse } from '@/interfaces'
import { ref } from 'vue'
import { baseGETRequest } from '@/functions'
import AppLoader from '@/components/UI/AppLoader.vue'
const txHashFormFields = [
  {
    value: '',
    label: 'txHash',
    name: 'txHash',
    required: true
  }
]
const txHashFormError = ref('')

const chartFormFields = [
  {
    value: '',
    label: 'poolAddress',
    name: 'poolAddress',
    required: true
  },
  {
    value: '',
    label: 'startingBlock',
    name: 'startingBlock',
    required: true
  },
  {
    value: '',
    label: 'blocks',
    name: 'blocks',
    required: true
  }
]
const chartFormError = ref('')

const showLoader = ref(false)
async function generateHash(query: IHashRequest): Promise<void> {
  try {
    beforeRequest()
    const response: IHashResponse = await baseGETRequest(
      `http://g.cybara.io/detect?txHash=${query.txHash}`
    )
    console.log(response)
  } catch (e: any) {
    console.error(e)
    txHashFormError.value = e.error
  } finally {
    showLoader.value = false
  }
}

async function generateChart(query: IChartRequest): Promise<void> {
  try {
    beforeRequest()
    const response: IChartResponse = await baseGETRequest(
      `http://g.cybara.io/api?poolAddress=${query.poolAddress}&startingBlock=${query.startingBlock}&blocks=${query.blocks}`
    )
    console.log(response)
  } catch (e: any) {
    console.error(e)
    chartFormError.value = e.error
  } finally {
    showLoader.value = false
  }
}

function beforeRequest(): void {
  showLoader.value = true
  txHashFormError.value = ''
  chartFormError.value = ''
}
</script>

<template>
  <main>
    <div class="forms">
      <AppForm
        :fields="txHashFormFields"
        :error-msg="txHashFormError"
        @submit="generateHash($event)"
      ></AppForm>
      <div class="divider"></div>
      <AppForm
        :fields="chartFormFields"
        :error-msg="chartFormError"
        @submit="generateChart($event)"
      ></AppForm>
    </div>
    <AppLoader v-if="showLoader" />
  </main>
</template>

<style lang="scss">
.forms {
  display: flex;
  margin: 0 -20px;
  .app-form {
    margin: 20px;
  }
  .divider {
    width: 2px;
    background: #808080;
  }
}
</style>
