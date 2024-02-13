<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
/** key - token, value - human name*/
interface Field {
  [key: string]: string
}

import { computed, ref } from 'vue'

const currentValue = ref('')
const currentId = ref('')
const showList = ref<boolean>(false)
const autocomplete = ref(null)

const props = defineProps<{
  list: Field
}>()

const emits = defineEmits<{
  select: string
}>()

const filterList = computed(() => {
  let filtered = {}
  if (currentValue.value.length) {
    for (let key in props.list) {
      if (Object.keys(filtered).length === 5) {
        break
      }
      if (props.list[key].toLowerCase().startsWith(currentValue.value.toLowerCase())) {
        filtered[key] = props.list[key]
      }
    }
  }
  return filtered
})

function focus() {
  if (currentValue.value.length) showList.value = true
}
function input() {
  focus()
  currentId.value = null
  emits('select', null)
}

function select(id, value) {
  showList.value = false
  currentValue.value = value
  currentId.value = id
  emits('select', id)
}
onClickOutside(autocomplete, () => (showList.value = false))
</script>

<template>
  <div
    class="autocomplete"
    ref="autocomplete"
  >
    <input
      type="text"
      v-model="currentValue"
      class="form__input"
      @input="input"
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
    z-index: 10;
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
