const Player = function (shape, isTurn, name, placements, hasWon) {
  return {
    shape,
    isTurn,
    name,
    placements,
    hasWon,
  };
};

const resetPlayer = function (player) {
  player.shape = null;
  player.isTurn = null;
  player.name = null;
  player.placements = [];
  player.hasWon = false;

  return player;
};

const gameElements = (() => {
  const startMenu = document.querySelector(".start-menu");
  const gameBoard = document.querySelector(".game-board");
  const statusBox = document.querySelector(".status-box");
  const gameStatus = document.querySelector(".game-status");
  const playerNameBox = document.querySelector(".player-name");
  const opponentNameBox = document.querySelector(".opponent-name");
  const startGameButton = document.querySelector(".start-game");
  const resetButton = document.querySelector(".reset-button");
  const xSelectorButton = document.querySelector(".x-selector");
  const oSelectorButton = document.querySelector(".o-selector");
  const player = Player(null, null, "Player One", [], false);
  const opponent = Player(null, null, "Player Two", [], false);

  const load = () => {
    startGameButton.addEventListener("click", () => {
      if (player.shape !== null) {
        startMenu.style.display = "none";
        gameBoard.style.display = "grid";
        statusBox.style.display = "grid";
        if (playerNameBox.value !== "P1 name (Optional)") {
          player.name = playerNameBox.value;
        } else player.name = "Player One";

        if (opponentNameBox.value !== "P2 name (Optional)") {
          opponent.name = opponentNameBox.value;
        } else opponent.name = "Player Two";

        if (player.shape === "O") {
          gameStatus.textContent = ` It's ${opponent.name}'s turn!`;
        } else gameStatus.textContent = ` It's ${player.name}'s turn!`;
      }
    });
    resetButton.addEventListener("click", () => {
      resetPlayer(player);
      resetPlayer(opponent);
      boardElements.resetBoard();
      startMenu.style.display = "grid";
      gameBoard.style.display = "none";
      statusBox.style.display = "none";
      xSelectorButton.style.backgroundColor = "#a3abd8";
      oSelectorButton.style.backgroundColor = "#a3abd8";
    });
    xSelectorButton.addEventListener("click", () => {
      if (player.shape !== "X") {
        oSelectorButton.style.backgroundColor = "#a3abd8";
        xSelectorButton.style.backgroundColor = "#717797";
        player.shape = "X";
        player.isTurn = true;
        opponent.shape = "O";
        opponent.isTurn = false;
      }
    });
    oSelectorButton.addEventListener("click", () => {
      if (player.shape !== "O") {
        xSelectorButton.style.backgroundColor = "#a3abd8";
        oSelectorButton.style.backgroundColor = "#717797";
        player.shape = "O";
        player.isTurn = false;
        opponent.shape = "X";
        opponent.isTurn = true;
      }
    });
  };

  return { load, player, opponent, gameBoard, gameStatus };
})();

const logicController = (() => {
  const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const checkWin = (player) => {
    if (
      gameElements.player.placements.length +
        gameElements.opponent.placements.length !==
      9
    ) {
      // eslint-disable-next-line no-restricted-syntax
      for (const condition of winConditions) {
        if (condition.every((val) => player.placements.includes(val))) {
          player.hasWon = true;
          gameElements.gameStatus.textContent = `${player.name} has won!`;
        }
      }
    } else {
      gameElements.gameStatus.textContent = `The game is a tie!`;
    }
  };

  return { checkWin };
})();

const boardElements = (() => {
  const gameSquares = document.querySelectorAll(".box");

  const loadBoard = () => {
    gameSquares.forEach((boardElement) =>
      boardElement.addEventListener("click", () => {
        const square = boardElement;
        if (
          gameElements.player.isTurn === true &&
          square.textContent === "" &&
          gameElements.player.hasWon === false &&
          gameElements.opponent.hasWon === false
        ) {
          square.textContent = gameElements.player.shape;
          gameElements.player.placements.push(parseInt(square.id, 10));
          gameElements.player.isTurn = false;
          gameElements.opponent.isTurn = true;
          gameElements.gameStatus.textContent = ` It's ${gameElements.opponent.name}'s turn!`;
          logicController.checkWin(gameElements.player);
        } else if (
          gameElements.opponent.isTurn === true &&
          square.textContent === "" &&
          gameElements.opponent.hasWon === false &&
          gameElements.player.hasWon === false
        ) {
          square.textContent = gameElements.opponent.shape;
          gameElements.opponent.placements.push(parseInt(square.id, 10));
          gameElements.player.isTurn = true;
          gameElements.opponent.isTurn = false;
          gameElements.gameStatus.textContent = ` It's ${gameElements.player.name}'s turn!`;
          logicController.checkWin(gameElements.opponent);
        }
      })
    );
  };

  const resetBoard = () => {
    gameSquares.forEach((boardElement) => {
      boardElement.textContent = "";
    });
  };

  return { loadBoard, resetBoard };
})();

gameElements.load();
boardElements.loadBoard();
