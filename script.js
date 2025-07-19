const board = document.querySelector('.board');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart');
const overlay = document.querySelector('.overlay');
const resultText = document.querySelector('.result');
const playAgainBtn = document.querySelector('.play-again');

let currentPlayer = 'X';
let gameActive = true;
let state = Array(9).fill('');

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], [0,3,6],
  [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

function initBoard() {
  board.innerHTML = '';
  state = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  overlay.style.display = 'none';
  state.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || state[idx]) return;
  state[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());
  if (checkWin()) endGame(`${currentPlayer} wins!`);
  else if (!state.includes('')) endGame("It's a draw!");
  else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winPatterns.some(p => 
    p.every(i => state[i] === currentPlayer));
}

function endGame(msg) {
  gameActive = false;
  resultText.textContent = msg;
  overlay.style.display = 'flex';
}

restartBtn.onclick = initBoard;
playAgainBtn.onclick = initBoard;

initBoard();
