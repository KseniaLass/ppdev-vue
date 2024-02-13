<script setup lang="ts">
/** key - token, value - human name*/
interface Field {
  [key: string]: string
}

import { computed, ref, watch } from 'vue'

const currentValue = ref('')
const showList = ref<boolean>(false)

const props = defineProps<{
  list: Field,
  value: ''
}>()

const emits = defineEmits<{
  select: string
}>()

watch(props.value, (newVal) => {
  currentValue.value = newVal
})

const filterList = computed(() => {
  let filtered = {}
  if (currentValue.value.length) {
    for (let key in props.list) {
      if (Object.keys(filtered).length === 5) {
        break
      }
      if (props.list[key].startsWith(currentValue.value)) {
        filtered[key] = props.list[key]
      }
    }
  }
  return filtered
})

function focus() {
  if (currentValue.value.length) showList.value = true
}

function select(id, value) {
  showList.value = false
  currentValue.value = value
  emits('select', id)
}
</script>

<template>
  <div class="autocomplete">
    <input
      type="text"
      v-model="currentValue"
      class="form__input"
      @input="focus"
      @focus="focus"
    />
    <ul
      class="autocomplete__list"
      v-show="showList"
    >
      <li
        v-for="(item, id) in filterList"
        :key="id"
        @click="select(id, item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/css/variables.scss' as var;
.autocomplete {
  position: relative;
  &__list {
    position: absolute;
    width: 100%;
    padding: 0;
    border-radius: var.$border-radius;
    overflow: hidden;
    li {
      list-style-type: none;
      padding: 5px 10px;
      background: var.$light;
      color: var.$dark;
      cursor: pointer;
      &:hover {
        background: var.$lighthover;
      }
    }
  }
}
</style>
