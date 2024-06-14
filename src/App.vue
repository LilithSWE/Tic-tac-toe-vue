<script setup lang="ts">
import Welcome from "./components/Welcome.vue";
import Players from "./components/Players.vue";
import Game from "./components/Game.vue";
import { ref } from "vue";

const showWelcomePage = ref(true);
const showPlayerPage = ref(false);
const showGamePage = ref(false);

const saveToLocalStorage = () => {
  localStorage.setItem(
    "showWelcomePage",
    JSON.stringify(showWelcomePage.value)
  );
  localStorage.setItem("showPlayerPage", JSON.stringify(showPlayerPage.value));
  localStorage.setItem("showGamePage", JSON.stringify(showGamePage.value));
};

const setInitialStorage = () => {
  if (localStorage.getItem("showWelcomePage") == null) {
    saveToLocalStorage();
  }
};
setInitialStorage();

// Makes sure the correct page shows even if the browser reloads
window.onload = () => {
  const valueWelcome = localStorage.getItem("showWelcomePage");
  if (valueWelcome == "true") {
    showWelcomePage.value = true;
  } else {
    showWelcomePage.value = false;
  }

  const valuePlay = localStorage.getItem("showPlayerPage");
  if (valuePlay == "true") {
    showPlayerPage.value = true;
  } else {
    showPlayerPage.value = false;
  }

  const valueGame = localStorage.getItem("showGamePage");
  if (valueGame == "true") {
    showGamePage.value = true;
  } else {
    showGamePage.value = false;
  }

  console.log("page is fully loaded");
};

const startNewSession = (display: boolean) => {
  showWelcomePage.value = display;
  showPlayerPage.value = !display;
  showGamePage.value = !display;
  saveToLocalStorage();
};

const pickPlayerNames = (display: boolean) => {
  showWelcomePage.value = !display;
  showPlayerPage.value = display;
  showGamePage.value = !display;
  saveToLocalStorage();
};

const startUpGame = (display: boolean) => {
  showWelcomePage.value = !display;
  showPlayerPage.value = !display;
  showGamePage.value = display;
  saveToLocalStorage();
};
</script>

<template>
  <Welcome v-if="showWelcomePage" @start-game="pickPlayerNames" />
  <Players
    v-if="showPlayerPage"
    @start-new-session="startNewSession"
    @start-playing="startUpGame"
  />
  <Game v-if="showGamePage" @start-new-session="startNewSession" />
</template>

<style scoped></style>
