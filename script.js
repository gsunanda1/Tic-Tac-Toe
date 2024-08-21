document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('#board');
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('#message');
    const resetButton = document.querySelector('#reset');

    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;

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

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (gameState[index] !== null || !gameActive) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameState.every(cell => cell !== null)) {
            message.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        gameState = Array(9).fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    message.textContent = `Player ${currentPlayer}'s turn`;
});