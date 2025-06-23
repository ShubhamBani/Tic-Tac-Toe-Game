const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const resultDisplay = document.querySelector('.game-result');
const resetBtn = document.querySelector('.reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];


function handleClick(e) {
    const index = Array.from(cells).indexOf(e.target);

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        const winMessage = `Player ${currentPlayer} wins!`;
        statusDisplay.textContent = winMessage;
        resultDisplay.textContent = winMessage; 
        setTimeout(() => {
            alert(winMessage);
        }, 100);
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        const drawMessage = `It's a Draw!`;
        statusDisplay.textContent = drawMessage;
        resultDisplay.textContent = drawMessage;
        setTimeout(() => {
            alert(drawMessage);
        }, 100);
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
}


function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    resultDisplay.textContent = ''; 
    cells.forEach(cell => (cell.textContent = ''));
}


cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);


statusDisplay.textContent = `Current Player: ${currentPlayer}`;
