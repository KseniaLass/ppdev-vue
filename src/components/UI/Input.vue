<script setup lang="ts">
defineProps<{
  value: string;
  required: {type: boolean, default: false};
}>()
const emit = defineEmits<
  {
    (e: 'input', value: 'string'): void
  }>()
</script>

<template>
  <input type="text" :value="value" class="input" @input="">
</template>

<style scoped>
  .input {
    border-radius: 2px;
  }
</style>
