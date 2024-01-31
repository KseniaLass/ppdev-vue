<script setup lang="ts">
import type { IFormField, IFormSubmitField } from '@/interfaces'
import { ref } from 'vue'

const props = defineProps<{
  fields: IFormField[]
}>()
const emit = defineEmits<{
  submit: IFormSubmitField[]
}>()

const values: IFormSubmitField[] = ref(props.fields.map(field => {
  return {
    name: field.name,
    value: field.value
  }
}))

function submit(): void {
  emit('submit', values)
}
</script>

<template>
  <form
    action="#"
    class="form"
    @submit.prevent="submit"
  >
    <div
      v-for="(field, i) in fields"
      :key="field.name"
      class="form__field"
    >
      <label
        :for="field.name"
        class="form__label"
        >{{ field.label }}</label
      >
      <input
        type="text"
        :name="field.name"
        class="form__input"
        :required="field.required"
        v-model="values[i].value"
      />
    </div>
    <input
      type="submit"
      class="form__submit"
    />
    <div class="form__error"></div>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  margin: 0 -10px;
  &__field {
    margin: 0 10px;
  }
  &__label {
    margin-right: 10px;
  }
  &__input {
    height: 30px;
    border-radius: 4px;
    border: none;
    padding: 0 10px;
    font-size: 14px;
  }
  &__submit {
    border-radius: 4px;
    border: none;
    padding: 0 10px;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      background: white;
    }
  }
}
</style>
