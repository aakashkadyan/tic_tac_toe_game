const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';

let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const messageElement = document.getElementById('message');
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            showMessage(`Player ${currentPlayer} wins!`);
            resetGame();
        } else if (gameBoard.every(cell => cell !== '')) {
            showMessage("It's a draw, Play Again :)");
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    currentPlayer = 'X';
}

function showMessage(message) {
    messageElement.textContent = message;
}
