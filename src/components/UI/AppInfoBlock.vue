<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      json: Object,
      clickable: Boolean
    }>(), {
      clickable: false
    }
  )
</script>

<template>
<div class="info-block" :class="{clickable: clickable}">
  <div v-for="(value, key) in json" :key="key" class="info-block__item">
    <strong>{{key}}: </strong>
    <span>{{value}}</span>
  </div>
</div>
</template>

<style scoped lang="scss">
  .info-block {
    border: 1px solid;
    padding: 10px;
    border-radius: 2px;
    margin-bottom: 20px;
    &.clickable {
      cursor: pointer;
      &:hover {
        color: #ebebeb;
      }
    }
  }
</style>