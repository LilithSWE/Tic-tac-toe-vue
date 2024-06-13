<script setup lang="ts">
defineEmits<{
  (e: "startGame", disabled: boolean): void;
}>();
</script>

<template>
  <section>
    <h1>Tic Tac Toe</h1>
    <div>
      <img
        src="../assets/tic-tac-toe.svg"
        alt="two x and two o in white on a transparent background"
        height="300"
        width="300"
      />
      <div class="rules">
        <p>
          This is a two player game where players take turns placing their
          symbol on an empty square.
        </p>
        <p>
          The goal is to get three of your symbols in a row (horizontally,
          vertically, or diagonally).If all squares are filled without a winner,
          it's a draw.
        </p>
      </div>
    </div>

    <button @click="$emit('startGame', false)">Play</button>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 7rem 22rem 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 1.5rem;
}
div {
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 2rem;
  justify-items: center;
  align-items: center;
}
h1 {
  font-size: 9rem;
  margin-block: 0;
}
h1:hover {
  font-size: 10rem;
  color: rgb(187, 241, 190);
}
.rules {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
p {
  width: 25rem;
  text-align: left;
  margin: 0;
}
img {
  height: 18rem;
  width: 18rem;
}
img:hover {
  height: 20rem;
  width: 20rem;
}
h1,
img {
  transition: all 0.25s;
}
</style>
