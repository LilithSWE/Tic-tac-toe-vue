<script setup lang="ts">
import Welcome from "./components/Welcome.vue";
import { ref } from "vue";

const showWelcomePage = ref(true);
const showGamePage = ref(true);

const toggleDisable = (disabled: boolean) => {
  showWelcomePage.value = disabled;
};

console.log(showWelcomePage.value);
</script>

<template>
  <Welcome v-if="showWelcomePage" @start-game="toggleDisable" />
</template>

<style scoped></style>
