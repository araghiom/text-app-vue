<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  id: String,
  label: String,
  type: { type: String, default: "text" },
  modelValue: String,
  error: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="input"
    />
    <span class="error" v-if="error">{{ error }}</span>
  </div>
</template>

<style scoped>
.input-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
}
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error {
  color: red;
  font-size: 0.9em;
}
</style>
