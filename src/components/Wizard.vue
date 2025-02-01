<script setup>
import { ref, computed, provide, defineProps, defineEmits } from "vue";
import Button from "@/components/base/Button.vue";
import StepUserName from "@/components/forms/StepUserName.vue";
import StepEmail from "@/components/forms/StepEmail.vue";
import StepReview from "@/components/forms/StepReview.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email as emailValidator, helpers } from "@vuelidate/validators";
import { addUser } from "@/api/usersApi";

const emit = defineEmits(["submit"]);

const form = ref({
  name: "",
  email: "",
});

const rules = {
  name: { required: helpers.withMessage("Name is required", required) },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Invalid email format", emailValidator),
  },
};

const v$ = useVuelidate(rules, form);

const steps = [
  { component: StepUserName, title: "Step 1: Enter Your Name" },
  { component: StepEmail, title: "Step 2: Enter Your Email" },
  { component: StepReview, title: "Step 3: Review Your Details" },
];

const stepIndex = ref(0);
const totalSteps = computed(() => steps.length);
const isLoading = ref(false);

const isPrevDisabled = computed(() => stepIndex.value === 0 || isLoading.value);
const isNextDisabled = computed(() => stepIndex.value === totalSteps.value - 1 || isLoading.value || !isStepValid(stepIndex.value));
const isSubmitVisible = computed(() => stepIndex.value === totalSteps.value - 1);
const isSubmitDisabled = computed(() => isLoading.value || !isStepValid(stepIndex.value));

const isStepValid = (step) => {
  if (step === 0) return !v$.value.name.$invalid;
  if (step === 1) return !v$.value.email.$invalid;
  return true;
};

const nextStep = () => {
  if (!isStepValid(stepIndex.value)) return;
  if (stepIndex.value < totalSteps.value - 1) stepIndex.value++;
};

const prevStep = () => {
  if (stepIndex.value > 0) stepIndex.value--;
};

const submitForm = async () => {
  isLoading.value = true;
  try {
    const { data, error } = await addUser(form.value);
    if (error) throw new Error(error);
    alert("User added successfully!");
  } catch (err) {
    console.error("Submission error:", err.message || "Something went wrong");
  } finally {
    isLoading.value = false;
  }
};

provide("currentStep", stepIndex);
</script>

<template>
  <div class="main-container">
    <div class="wizard-container">
      <component :is="steps[stepIndex].component" :form="form" :v$="v$" />

      <div class="button-group">
        <Button id="btn-prev" label="Prev" :isDisabled="isPrevDisabled" @click="prevStep" />
        <Button v-if="!isSubmitVisible" id="btn-next" label="Next" :isDisabled="isNextDisabled" @click="nextStep" />
        <Button v-if="isSubmitVisible" id="btn-submit" label="Submit" :isLoading="isLoading" :isDisabled="isSubmitDisabled" @click="submitForm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wizard-container {
  height: 300px;
  min-width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
