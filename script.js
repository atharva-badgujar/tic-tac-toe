const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const celebration = document.querySelector('.celebration');
const emojis = document.querySelectorAll('.emoji');

let currentPlayer = 'X';
let gameOver = false;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  const cellValue = cell.getAttribute('data-cell');

  if (!cellValue && !gameOver) {
    cell.setAttribute('data-cell', currentPlayer);
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      gameOver = true;
      message.textContent = `${currentPlayer} wins!`;
      celebration.style.display = 'flex';
    } else if (isBoardFull()) {
      gameOver = true;
      message.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin(player) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]           // Diagonals
  ];

  return winningCombos.some(combo => {
    return combo.every(index => cells[index].getAttribute('data-cell') === player);
  });
}

function isBoardFull() {
  return [...cells].every(cell => cell.getAttribute('data-cell') !== '');
}
