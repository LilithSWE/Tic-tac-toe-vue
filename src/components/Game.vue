<script setup lang="ts">
import { reactive, ref } from "vue";

const player = ref("X");
const currentPlayerName = ref("X");
const playerX = ref<string | null>(null);
const playerO = ref<string | null>(null);
const scoreX = ref(0);
const scoreO = ref(0);
const gameover = ref(false);
const winner = ref<string | null>(null);
const tie = ref(false);
let grid = reactive([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);
const showScoreDialog = ref(false);
const showResultDialogWinner = ref(false);
const showResultDialogTie = ref(false);

const emit = defineEmits<{
  (e: "startNewSession", display: boolean): void;
}>();

const reset = () => {
  grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player.value = "X";
  gameover.value = false;
  winner.value = null;
  saveGridLocally();
  location.reload();
};

const changeGrid = (row: number, col: number) => {
  if (!grid[row][col] && !winner.value) {
    grid[row][col] = player.value;
    if (checkWin()) {
      getScore();
      winner.value = currentPlayerName.value;
      addPoints();
      toggleResultDialog("winner");
    } else if (checkTie()) {
      getScore();
      tie.value = true;
      toggleResultDialog("tie");
    } else {
      getScore();
      player.value = player.value === "X" ? "O" : "X";
      setCurrentPlayerName();
    }
  }
  saveGridLocally();
};

const saveGridLocally = () => {
  localStorage.setItem("grid_row1", JSON.stringify(grid[0]));
  localStorage.setItem("grid_row2", JSON.stringify(grid[1]));
  localStorage.setItem("grid_row3", JSON.stringify(grid[2]));
};

const getGrid = () => {
  let row1: [] = [];
  let row2: [] = [];
  let row3: [] = [];

  let data1 = localStorage.getItem("grid_row1");
  let data2 = localStorage.getItem("grid_row2");
  let data3 = localStorage.getItem("grid_row3");

  if (data1 != null) {
    row1 = JSON.parse(data1);
  }
  if (data2 != null) {
    row2 = JSON.parse(data2);
  }
  if (data3 != null) {
    row3 = JSON.parse(data3);
  }

  grid = [row1, row2, row3];
  console.log(grid);
};

const getPlayerNames = () => {
  playerX.value = localStorage.getItem("playerXName");
  playerO.value = localStorage.getItem("playerOName");
};

const getScore = () => {
  if (localStorage.getItem("scoreX") != null) {
    scoreX.value = Number(localStorage.getItem("scoreX"));
  }
  if (localStorage.getItem("scoreO") != null) {
    scoreO.value = Number(localStorage.getItem("scoreO"));
  }
};

const setCurrentPlayerName = () => {
  if (player.value == "X" && playerX.value) {
    currentPlayerName.value = playerX.value;
  } else if (player.value == "O" && playerO.value) {
    currentPlayerName.value = playerO.value;
  }
  localStorage.setItem("currentPlayerName", currentPlayerName.value);
};
// run once
getGrid();
getScore();
getPlayerNames();
setCurrentPlayerName();

window.onload = () => {
  getGrid();
  getScore();
  getPlayerNames();
  setCurrentPlayerName();
};

const addPoints = () => {
  if (player.value == "X") {
    scoreX.value = Number(localStorage.getItem("scoreX")) + 1;
    console.log(scoreX.value);
    localStorage.setItem("scoreX", JSON.stringify(scoreX.value));
  } else {
    scoreO.value = Number(localStorage.getItem("scoreO")) + 1;
    console.log(scoreO.value);
    localStorage.setItem("scoreO", JSON.stringify(scoreO.value));
  }
};

const checkWin = () => {
  const a = player.value;

  for (let i = 0; i < 3; i++) {
    if (grid[i].every((cell) => cell === a)) return true;
    if (grid.every((row) => row[i] === a)) return true;
  }

  // Check diagonals
  if (grid[0][0] === a && grid[1][1] === a && grid[2][2] === a) return true;
  if (grid[0][2] === a && grid[1][1] === a && grid[2][0] === a) return true;
  return false;
};

const checkTie = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!grid[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const toggleScoreDialog = () => {
  getScore();
  showScoreDialog.value = !showScoreDialog.value;
};

const toggleResultDialog = (result: string) => {
  if (result == "winner") {
    showResultDialogWinner.value = true;
  } else {
    showResultDialogTie.value = true;
  }
};

const startNewSession = () => {
  reset();
  emit("startNewSession", true);
};

const closeResultDialog = (playAgain: boolean) => {
  showResultDialogWinner.value = false;
  showResultDialogTie.value = false;
  if (playAgain) {
    reset();
  } else {
    startNewSession();
  }
  return;
};
</script>

<template>
  <section class="gameContainer">
    <h2>
      Current player: <span> {{ currentPlayerName }}</span>
    </h2>
    <div class="gridContainer">
      <div class="row" v-for="(row, rowIndex) of grid" :key="rowIndex">
        <div
          class="cell"
          v-for="(cell, cellIndex) of row"
          :key="cellIndex"
          :class="{ 'cell-x': cell === 'X', 'cell-o': cell === 'O' }"
          :disabled="cell !== null"
          @click="changeGrid(rowIndex, cellIndex)"
        >
          {{ cell }}
        </div>
      </div>
    </div>
    <div class="btnContainer">
      <button @click.prevent="toggleScoreDialog()">Score</button>
      <button @click.prevent="reset()">Restart Match</button>
      <button @click.prevent="startNewSession()" class="return">
        Exit Game
      </button>
    </div>
  </section>

  <dialog v-if="showScoreDialog" class="scoreDialog">
    <h3>Current Score</h3>
    <p>{{ playerX }}, playing X: {{ scoreX }}</p>
    <p>{{ playerO }}, playing O: {{ scoreO }}</p>
    <button @click.prevent="toggleScoreDialog()">Close</button>
  </dialog>

  <dialog v-if="showResultDialogWinner" class="resultDialog">
    <h3>The winner is: {{ winner }}!</h3>
    <h4>Current Score</h4>
    <p>{{ playerX }}, playing X: {{ scoreX }}</p>
    <p>{{ playerO }}, playing O: {{ scoreO }}</p>
    <button @click.prevent="closeResultDialog(true)">Play Again</button>
    <button @click.prevent="closeResultDialog(false)" class="return">
      Exit Game
    </button>
  </dialog>

  <dialog v-if="showResultDialogTie" class="resultDialog">
    <h3>It's a tie!</h3>
    <h4>Current Score</h4>
    <p>{{ playerX }}, playing X: {{ scoreX }}</p>
    <p>{{ playerO }}, playing O: {{ scoreO }}</p>
    <button @click.prevent="closeResultDialog(true)">Play Again</button>
    <button @click.prevent="closeResultDialog(false)" class="return">
      Exit Game
    </button>
  </dialog>
</template>

<style scoped>
h2 {
  font-size: 4rem;
  margin: 1rem;
}

h3 {
  font-size: 3rem;
  margin: 1rem;
}

h4 {
  font-size: 2rem;
  margin: 1rem;
}

p {
  font-size: 1.4rem;
  margin-bottom: 0;
}

button {
  margin-top: 1rem;
}

.gameContainer {
  display: grid;
  grid-template-columns: 80vw;
  grid-template-rows: 10rem 1.5fr 1fr;
  align-items: center;
  justify-items: center;
}

.gridContainer {
  border: 4px solid #838383;
  width: fit-content;
  align-self: center;
}

.row {
  clear: both;
}

.cell {
  width: 8rem;
  height: 8rem;
  float: left;
  margin-right: -1px;
  margin-bottom: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #838383;
  cursor: pointer;
  font-size: 6rem;
}

.cell-x {
  color: rgb(187, 241, 190);
}

.cell-o {
  color: rgb(241, 227, 187);
}

.btnContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

dialog {
  position: fixed;
  top: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
}
</style>
