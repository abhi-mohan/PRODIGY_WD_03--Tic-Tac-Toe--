let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let highscore = 0;
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const highscoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
let player1 = 'Player 1';
let player2 = 'Player 2';

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
document.getElementById('theme').addEventListener('change', changeTheme);

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] !== '' || isGameOver) return;

    gameState[index] = currentPlayer;
    e.target.setAttribute('data-value', currentPlayer);

    if (checkWinner()) {
        message.textContent = `${currentPlayer} Wins! ${currentPlayer === 'X' ? player1 : player2} is awesome!`;
        highscore++;
        highscoreDisplay.textContent = highscore;
        isGameOver = true;
    } else if (gameState.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
        if (player2.toLowerCase() === 'computer' && currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    } else {
        message.textContent = `It's a Tie!`;
        isGameOver = true;
    }
}

function computerMove() {
    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
    });
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.click();
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    cells.forEach(cell => cell.setAttribute('data-value', ''));
    message.textContent = `Player X's turn`;
}

function changeTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme;
}

player1Input.addEventListener('input', () => {
    player1 = player1Input.value || 'Player 1';
});

player2Input.addEventListener('input', () => {
    player2 = player2Input.value || 'Player 2';
});
