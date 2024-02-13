<script setup lang="ts">

import AppForm from '@/components/UI/AppForm.vue'
import { computed } from 'vue'
import type { IFormField } from '@/interfaces'
import { useFootsStore } from '@/stores/foots'
import AppInfoBlock from '@/components/UI/AppInfoBlock.vue'

const footStore = useFootsStore()

const footFormFields = computed((): IFormField[] => {
  return [
    {
      name: 'token',
      value: footStore.query.token,
      type: 'autocomplete',
      required: true,
      hidden: false,
      autoCompleteList: footStore.tokensList
    },
    {
      name: 'size',
      value: footStore.query.size,
      type: 'text',
      required: true,
      hidden: false
    },
    {
      name: 'human',
      value: true,
      type: 'checkbox',
      required: true,
      hidden: true
    }
  ]
})
</script>

<template>
  <div class="foots">
    <AppForm :fields="footFormFields" @submit="footStore.getFoots($event)"/>
    <AppInfoBlock :json="footStore.foots"/>
  </div>
</template>

<style scoped lang="scss">

</style>