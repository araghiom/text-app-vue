<script setup>
import { defineProps } from "vue";

defineProps({
  title: String, // Dynamic title for each step
});
</script>

<template>
  <header class="form-header">
    <h2>{{ title }}</h2>
  </header>
</template>

<style scoped>
.form-header {
  text-align: center;
  margin-bottom: 20px;
}
h2 {
  font-size: 1.5rem;
  color: #333;
}
</style>
