<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    json: Object,
    clickable?: Boolean
  }>(), {
    clickable: false
  }
)
function getLast4Chars(str: string): string {
  return str.substring(str.length - 4)
}
</script>

<template>
<div class="info-block" :class="{clickable: clickable}">
  <div v-for="(value, key) in json" :key="key" class="info-block__item">
    <template v-if="key === 'txHash'">
      <a :href="`https://etherscan.io/tx/${value}`" target="_blank">
        <strong>{{ key }}: </strong>
        <span>{{getLast4Chars(value)}}</span>
      </a>
    </template>
    <template v-else-if="key === 'poolAddress' || key === 'sender'">
      <a :href="`https://etherscan.io/address/${value}`" target="_blank">
        <strong>{{ key }}: </strong>
        <span>{{getLast4Chars(value)}}</span>
      </a>
    </template>
    <template v-else-if="key === 'token0' || key === 'token1'">
      <a :href="`https://etherscan.io/token/${value}`" target="_blank">
        <strong>{{ key }}: </strong>
        <span>{{getLast4Chars(value)}}</span>
      </a>
    </template>
    <template v-else>
      <strong>{{key}}: </strong>
      <span :class="{'sell': value === 'sell', 'buy': value === 'buy' }">{{value}}</span>
    </template>
  </div>
</div>
</template>

<style scoped lang="scss">
@use '@/assets/css/variables.scss' as var;
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
  span {
    &.sell {
      color: var.$error
    }
    &.buy {
      color: var.$success
    }
  }
}
</style>