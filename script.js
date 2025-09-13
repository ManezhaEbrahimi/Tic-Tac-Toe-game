 const board = document.getElementById("board");
    const statusText = document.getElementById("status");
    let currentPlayer = "X";
    let gameOver = false;
    let cells = ["", "", "", "", "", "", "", "", ""];

    function createBoard() {
      board.innerHTML = "";
      cells.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
      });
    }

    function handleClick(e) {
      const index = e.target.dataset.index;
      if (cells[index] !== "" || gameOver) return;
      cells[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWinner()) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
      }

      if (!cells.includes("")) {
        statusText.textContent = "😎 It's a Draw!";
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function checkWinner() {
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

      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
      });
    }

    function restartGame() {
      currentPlayer = "X";
      gameOver = false;
      cells = ["", "", "", "", "", "", "", "", ""];
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
      createBoard();
    }

    createBoard();