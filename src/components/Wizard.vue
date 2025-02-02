<script setup>
import { ref, computed, provide, defineEmits } from "vue";
import Button from "@/components/base/Button.vue";
import StepUserName from "@/components/forms/StepUserName.vue";
import StepEmail from "@/components/forms/StepEmail.vue";
import StepReview from "@/components/forms/StepReview.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email as emailValidator, minLength, maxLength, helpers } from "@vuelidate/validators";
import { addUser } from "@/api/usersApi";

const emit = defineEmits(["submit"]);

const form = ref({
  username: "",
  email: "",
});

const rules = {
  username: [
    helpers.withMessage("Invalid Username.", required),
    helpers.withMessage("Invalid Username.", minLength(4)),
    helpers.withMessage("Invalid Username.", maxLength(20)),
    helpers.withMessage("Invalid Username.", helpers.regex(/^[a-zA-Z0-9_]+$/)), 
  ],
 email: [
    helpers.withMessage("Invalid email address.", required),
    helpers.withMessage("Invalid email address.", emailValidator),
  ],
};

const v$ = useVuelidate(rules, form);

const steps = [
  { component: StepUserName, title: "Username: " },
  { component: StepEmail, title: "Email: " },
  { component: StepReview, title: "Step: review" },
];

const stepIndex = ref(0);
const totalSteps = computed(() => steps.length);
const isLoading = ref(false);

const isPrevDisabled = computed(() => stepIndex.value === 0);
const isNextDisabled = computed(() => stepIndex.value === totalSteps.value - 1);
const isSubmitVisible = computed(() => stepIndex.value === totalSteps.value - 1);
const isSubmitDisabled = computed(() => isLoading.value || !isFormValid());

const isFormValid = () => {
  return v$.value.$silentErrors.length === 0; 
};


const nextStep = async () => {
  if (stepIndex.value === 0) {
    await v$.value.username.$validate();
    if (v$.value.username.$invalid) {
      v$.value.username.$touch();
      return;
    }
  } else if (stepIndex.value === 1) {
    await v$.value.email.$validate();
    if (v$.value.email.$invalid) {
      v$.value.email.$touch();
      return;
    }
  }

  stepIndex.value++;
};

const prevStep = () => {
  if (stepIndex.value > 0) {
    stepIndex.value--; 
    console.log("Current Step Index:", stepIndex.value); 
  }
};

const submitForm = async () => {
  await v$.value.$validate();
  if (v$.value.$invalid) return;
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
      <h2>{{ steps[stepIndex].title }}</h2>
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
