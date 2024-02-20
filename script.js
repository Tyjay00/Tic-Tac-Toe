document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    let currentPlayer = "X";
    let gameBoard = Array(9).fill("");

    function renderBoard() {
        board.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.textContent = gameBoard[i];
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === "") {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (isBoardFull()) {
                alert("It's a tie!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentPlayer === "O") {
                    setTimeout(makeAIMove, 500);
                }
            }
        }
    }

    function makeAIMove() {
        const emptyCells = gameBoard.reduce((acc, cell, index) => {
            if (cell === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];
        gameBoard[aiMove] = currentPlayer;
        renderBoard();

        if (checkWinner()) {
            alert(currentPlayer === "O" ? "Computer wins!" : `Player ${currentPlayer} wins!`);
            resetGame();
        } else if (isBoardFull()) {
            alert("It's a tie!");
            resetGame();
        } else {
            currentPlayer = "X";
        }
    }

    function showFlashMessage(message) {
        const flashMessage = document.createElement("div");
        flashMessage.textContent = message;
        flashMessage.classList.add("flash-message");
        document.body.appendChild(flashMessage);
    
        // Remove the flash message after a short delay
        setTimeout(() => {
            document.body.removeChild(flashMessage);
        }, 1500);
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    function isBoardFull() {
        return gameBoard.every(cell => cell !== "");
    }

    function resetGame() {
        currentPlayer = "X";
        gameBoard = Array(9).fill("");
        renderBoard();
    }

    renderBoard();
});





