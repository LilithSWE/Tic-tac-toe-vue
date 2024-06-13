<script setup lang="ts">
import { ref } from "vue";

let playerName = ref("");
let currentPlayerChoosing = ref("Player X");

const readyToStart = () => {
  if (playerName.value == "") {
    console.log("no input");
    return;
  }

  if (localStorage.getItem("playerXName") != "") {
    localStorage.setItem("playerOName", playerName.value);
    console.log("playerOName set to: " + playerName.value);
    currentPlayerChoosing = "Player X";
    playerName.value = "";
  } else {
    localStorage.setItem("playerXName", playerName.value);
    console.log("playerXName set to: " + playerName.value);
    playerName.value = "";
    currentPlayerChoosing = "Player O";
    return;
  }
};
</script>

<template>
  <section>
    <h2>{{ currentPlayerChoosing }}</h2>
    <form @submit.prevent="readyToStart">
      <input type="text" placeholder="Your name..." v-model="playerName" />
      <button>Save</button>
    </form>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}
h2 {
  font-size: 5rem;
  margin-block: 0;
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}
input {
  height: 2rem;
  width: 20rem;
  font-size: 1.5rem;
}
</style>
