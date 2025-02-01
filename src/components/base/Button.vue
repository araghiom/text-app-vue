<script setup>
import { defineProps } from "vue";

defineProps({
  id: String,
  label: String,
  isLoading: Boolean,
  isDisabled: Boolean,
  onClick: Function,
});
</script>

<template>
  <button :id="id" :disabled="isDisabled || isLoading" @click="onClick" class="btn">
    <span v-if="isLoading">Loading...</span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<style scoped>
.btn {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin: 5px;
}
.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
