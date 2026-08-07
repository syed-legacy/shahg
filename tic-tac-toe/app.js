const boxes = document.querySelectorAll(".game");
const statusText = document.querySelector("#status");
const resetBtn = document.querySelector("#reset");

let currentPlayer = "X";
let gameOver = false;
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6], 
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || gameOver) return;

    box.innerText = currentPlayer;
    box.disabled = true;

    if (checkWinner()) {
      gameOver = true;
      statusText.textContent = `Player ${currentPlayer} wins!`;
      return;
    }

    if (isDraw()) {
      gameOver = true;
      statusText.textContent = "It's a draw!";
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  });
});

function checkWinner() {
  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    );
  });
}

function isDraw() {
  return [...boxes].every((box) => box.innerText !== "");
}

function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

resetBtn.addEventListener("click", resetGame);
