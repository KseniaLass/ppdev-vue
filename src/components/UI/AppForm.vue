<script setup lang="ts">
import type { IFormField } from '@/interfaces'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    fields: IFormField
    errorMsg: string
  }>(),
  {
    errorMsg: ''
  }
)
const emit = defineEmits<{
  submit: any
}>()

const values = ref()

values.value = { ...props.fields }

watch(
  () => props.fields,
  () => {
    for (let key in { ...props.fields }) {
      values.value[key] = props.fields[key]
    }
  }
)

function setValue(value: string, key: string | number): void {
  values.value[key] = value
}

function submit(): void {
  emit('submit', { ...values.value })
}

function minusStartingBlock() {
  values.value.startingBlock = (+props.fields.startingBlock - 20).toString()
  values.value.blocks = (+props.fields.blocks + 20).toString()
}
function plusBlocks(count: number) {
  values.value.blocks = (+props.fields.blocks + count).toString()
}
</script>

<template>
  <div class="app-form">
    <form
      action="#"
      class="form"
      @submit.prevent="submit()"
    >
      <div
        v-for="(value, key) in fields"
        :key="key"
        class="form__field"
      >
        <label
          :for="key as string"
          class="form__label"
          >{{ key }}</label
        >
        <input
          type="text"
          :name="key as string"
          class="form__input"
          :required="true"
          :value="value"
          @input="setValue(($event.target as HTMLInputElement).value, key)"
        />
        <div class="form__buttons">
          <button
            v-if="key === 'startingBlock'"
            @click="minusStartingBlock"
            :class="{ disabled: !fields.startingBlock.length }"
          >
            startingBlock - 20
          </button>
          <button
            v-if="key === 'blocks'"
            @click="plusBlocks(100)"
            :class="{disabled: !fields.blocks.length}"
          >
            + 100
          </button>
          <button
            v-if="key === 'blocks'"
            @click="plusBlocks(1000)"
            :class="{disabled: !fields.blocks.length}"
          >
            + 1000
          </button>
        </div>
      </div>
      <input
        type="submit"
        class="form__submit"
        value="Send"
      />
    </form>
    <div
      class="form__error"
      v-if="props.errorMsg.length"
    >
      {{ errorMsg }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/css/variables.scss' as var;
.form {
  display: flex;
  align-items: end;
  &__field {
    margin-right: 10px;
  }
  &__label {
    margin-bottom: 5px;
    display: inline-block;
    font-size: 14px;
  }
  &__input {
    height: 30px;
    border-radius: 4px;
    border: none;
    padding: 0 10px;
    font-size: 14px;
    width: 100%;
  }
  &__submit {
    border-radius: 4px;
    border: none;
    padding: 0 10px;
    cursor: pointer;
    font-weight: 600;
    height: 30px;
    font-size: 14px;
    margin-bottom: 27px;
    &:hover {
      background: white;
    }
  }
  &__error {
    color: var.$error;
    height: 19px;
    position: absolute;
  }
  &__buttons {
    height: 22px;
    margin-top: 5px;
    display: flex;
    button {
      background: var.$success;
      border: 0;
      border-radius: 4px;
      color: var.$dark;
      font-weight: 600;
      cursor: pointer;
      margin-right: 5px;
      &:hover {
        background: var.$successhover;
      }
      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
}
</style>
