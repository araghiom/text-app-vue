<script setup>
import { defineProps } from "vue";
import { inject } from "vue";
import FormHeader from "@/components/shared/FormHeader.vue";

defineProps(["form", "v$"]);
const currentStep = inject("currentStep");
</script>

<template>
  <div>
    <FormHeader :title="`Step ${currentStep + 1}: Review Your Details`" />
    <p>{{"Username: "}} {{ form.username }}</p>
    <p>{{"Email: "  }} {{ form.email }}</p>
  </div>
</template>
