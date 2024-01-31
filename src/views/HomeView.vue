<script setup lang="ts">
import AppForm from '@/components/UI/AppForm.vue'
const txHashFields = [
  {
    value: '',
    label: 'txHash',
    name: 'txHash',
    required: true,
  }
]
</script>

<template>
  <main>
    <AppForm
      :fields="txHashFields"
    ></AppForm>
  </main>
</template>
