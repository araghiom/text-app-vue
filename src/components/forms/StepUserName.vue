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
    <FormHeader :title="`Step ${currentStep + 1}: Enter Your User Name`" />
    <Input label="username" id="username" v-model="form.name" :error="v$.name.$error ? v$.name.$errors[0].$message : ''" />
  </div>
</template>
