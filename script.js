const Player = function (shape, isTurn, name, placements, hasWon) {
  return {
    shape,
    isTurn,
    name,
    placements,
    hasWon,
  };
};

const gameElements = (() => {
  const startMenu = document.querySelector(".start-menu");
  const gameBoard = document.querySelector(".game-board");
  const statusBox = document.querySelector(".status-box");
  const gameStatus = document.querySelector(".game-status");
  const startGameButton = document.querySelector(".start-game");
  const resetButton = document.querySelector(".reset-button");
  const xSelectorButton = document.querySelector(".x-selector");
  const oSelectorButton = document.querySelector(".o-selector");
  let player = Player(null, null, "Player One", [], false);
  let opponent = Player(null, null, "Player Two", [], false);

  const load = () => {
    startGameButton.addEventListener("click", () => {
      if (player.shape !== null) {
        startMenu.style.display = "none";
        gameBoard.style.display = "grid";
        statusBox.style.display = "grid";
      }
    });
    resetButton.addEventListener("click", () => {
      player = (null, null, null, [], false);
      opponent = (null, null, null, [], false);
      startMenu.style.display = "grid";
      gameBoard.style.display = "none";
      statusBox.style.display = "none";
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
    console.log(gameElements.player.placements);
    console.log(gameElements.opponent.placements);
    // eslint-disable-next-line no-restricted-syntax
    for (const condition of winConditions) {
      if (condition.every((val) => player.placements.includes(val))) {
        player.hasWon = true;
        gameElements.gameStatus.textContent = `${player.name} has won!`;
      }
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

  return { loadBoard };
})();

gameElements.load();
boardElements.loadBoard();
