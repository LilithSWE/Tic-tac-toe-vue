<script setup lang="ts"></script>

<template>
  <section>
    <h1>Tic Tac Toe</h1>
    <img
      src="../assets/tic-tac-toe.svg"
      alt="two x and two o in white on a transparent background"
      height="350"
      width="350"
    />
    <button>Spela</button>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 7rem 420px 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 2rem;
}
h1 {
  font-size: 6rem;
  margin-block: 0;
}
h1:hover {
  font-size: 6.5rem;
}
img:hover {
  height: 400px;
  width: 400px;
}
h1,
img {
  transition: all 0.25s;
}
</style>
