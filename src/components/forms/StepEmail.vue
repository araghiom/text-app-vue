<script setup>
import { defineProps } from "vue";
import { inject } from "vue";
import FormHeader from "@/components/shared/FormHeader.vue";
import Input from "@/components/base/Input.vue";

defineProps(["form", "v$"]);
const currentStep = inject("currentStep");
</script>

<template>
  <div>
    <FormHeader :title="`Step ${currentStep + 1}: Enter Your Email`" />
    <Input
      label="Email:"
      id="email"
      type="email"
      v-model="form.email"
      :error="v$.email.$error ? v$.email.$errors[0].$message : ''"
    />
  </div>
</template>
