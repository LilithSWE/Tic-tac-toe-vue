<script setup lang="ts">
import { editLocalStorage } from "./helpers/localStorage.ts";
import Welcome from "./components/Welcome.vue";
import Players from "./components/Players.vue";
import Game from "./components/Game.vue";
import { ref } from "vue";

const showWelcomePage = ref(true);
const showPlayerPage = ref(false);
const showGamePage = ref(false);

const startNewSession = (disabled: boolean) => {
  showWelcomePage.value = disabled;
  showPlayerPage.value = !disabled;

  localStorage.setItem("playerXName", "");
  localStorage.setItem("playerOName", "");

  if (disabled) {
    editLocalStorage("clear", "", "");
    console.log("cleared all gamedata from local storage");
  }
};

const startUpGame = (newGame: boolean) => {
  showPlayerPage.value = !newGame;
  showGamePage.value = newGame;
};
</script>

<template>
  <Welcome v-if="showWelcomePage" @start-game="startNewSession" />
  <Players
    v-if="showPlayerPage"
    @start-game="startNewSession"
    @start-playing="startUpGame"
  />
  <Game v-if="showGamePage" />
</template>

<style scoped></style>
