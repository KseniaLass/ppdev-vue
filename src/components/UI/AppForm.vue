<script setup lang="ts">
import type { IFormField } from '@/interfaces'
import { ref, toRaw, watch } from 'vue'

const props = withDefaults(defineProps<{
  fields: IFormField,
  errorMsg: String
}>(), {
  errorMsg: ''
})
const emit = defineEmits<{
  submit: IFormField
}>()

const values = ref({});

watch(props.fields, (val: IFormField) => {
  values.value =  { ...val }
})

function setValue(value: string, key: string): void {
  values.value[key] = value
}

function submit(): void {
  emit('submit', {...values.value})
}
</script>

<template>
  <div class="app-form">
    <form
      action="#"
      class="form"
      @submit.prevent="submit"
    >
      <div
        v-for="(value, key) in fields"
        :key="key"
        class="form__field"
      >
        <label
          :for="key"
          class="form__label"
        >{{ key }}</label
        >
        <input
          type="text"
          :name="key"
          class="form__input"
          :required="true"
          :value="value"
          @input="setValue($event.target.value, key)"
        />
      </div>
      <input
        type="submit"
        class="form__submit"
      />
    </form>
    <div class="form__error" v-if="props.errorMsg.length">{{errorMsg}}</div>
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
    &:hover {
      background: white;
    }
  }
  &__error {
    margin: 15px 0 0;
    color: var.$error;
    height: 19px;
  }
}
</style>
