const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let cells = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');

    if (cell === 'X') div.classList.add('x');
    if (cell === 'O') div.classList.add('o');

    div.addEventListener('click', () => makeMove(index));
    div.textContent = cell;
    board.appendChild(div);
  });
}

function makeMove(index) {
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  createBoard();

  if (checkWinner()) {
    message.textContent = `🎉 ¡Jugador ${currentPlayer} ganó!`;
    gameActive = false;
    if (currentPlayer === 'X') {
      scoreX++;
      document.getElementById('scoreX').textContent = scoreX;
    } else {
      scoreO++;
      document.getElementById('scoreO').textContent = scoreO;
    }
    return;
  }

  if (!cells.includes("")) {
    message.textContent = "🤝 ¡Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Turno del jugador ${currentPlayer}`;
}

function checkWinner() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return wins.some(combo =>
    combo.every(index => cells[index] === currentPlayer)
  );
}

function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = `Turno del jugador ${currentPlayer}`;
  createBoard();
}

// Inicialización
createBoard();
message.textContent = `Turno del jugador ${currentPlayer}`;

