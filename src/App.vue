<script setup lang="ts">
import Welcome from "./components/Welcome.vue";
import Players from "./components/Players.vue";
import { ref } from "vue";

const showWelcomePage = ref(true);
const showPlayerPage = ref(false);
const showGamePage = ref(false);

const startNewSession = (disabled: boolean) => {
  showWelcomePage.value = disabled;
  showPlayerPage.value = !disabled;

  localStorage.setItem("playerXName", "");
  localStorage.setItem("playerOName", "");
};

console.log(showWelcomePage.value);
</script>

<template>
  <Welcome v-if="showWelcomePage" @start-game="startNewSession" />
  <Players v-if="showPlayerPage" />
</template>

<style scoped></style>
