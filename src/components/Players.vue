<script setup lang="ts">
import { ref } from "vue";

let playerName = ref("");
let currentPlayerChoosing = ref("Player X");

const emit = defineEmits<{
  (e: "startGame", disabled: boolean): void;
  (e: "startPlaying", newGame: boolean): void;
}>();

const saveUser = () => {
  if (playerName.value == "") {
    console.log("no input");
    return;
  }

  if (localStorage.getItem("playerXName") != "") {
    localStorage.setItem("playerOName", playerName.value);
    console.log("playerOName set to: " + playerName.value);
    currentPlayerChoosing = "Player X";
    playerName.value = "";
    emit("startPlaying", true);
  } else {
    localStorage.setItem("playerXName", playerName.value);
    console.log("playerXName set to: " + playerName.value);
    playerName.value = "";
    currentPlayerChoosing = "Player O";
  }
};
</script>

<template>
  <section>
    <h2>{{ currentPlayerChoosing }}</h2>
    <form @submit.prevent="saveUser">
      <input type="text" placeholder="Your name..." v-model="playerName" />
      <button>Save name</button>
    </form>
    <button class="return" @click="$emit('startGame', true)">
      Return to start
    </button>
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
  padding: 10px;
}
.return {
  width: 13rem;
}
.return:hover {
  border-color: #741042;
  color: rgb(241, 191, 187);
}
</style>
