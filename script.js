const Player = function (shape, isTurn, name, placements = []) {
  return {
    shape,
    isTurn,
    name,
    placements,
  };
};

const gameElements = (() => {
  const startMenu = document.querySelector(".start-menu");
  const gameBoard = document.querySelector(".game-board");
  const startGameButton = document.querySelector(".start-game");
  const xSelectorButton = document.querySelector(".x-selector");
  const oSelectorButton = document.querySelector(".o-selector");
  const player = Player(null, null, null);
  const opponent = Player(null, null, null);

  const load = () => {
    startGameButton.addEventListener("click", () => {
      if (player.shape !== null) {
        startMenu.style.display = "none";
        gameBoard.style.display = "grid";
      }
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

  return { load, player, opponent, gameBoard };
})();

const logicController = (() => {})();

const boardElements = (() => {
  const gameSquares = document.querySelectorAll(".box");

  const gameBoard = {};

  const loadBoard = () => {
    gameSquares.forEach((boardElement) =>
      boardElement.addEventListener("click", () => {
        const square = boardElement;
        if (gameElements.player.isTurn === true && square.textContent === "") {
          square.textContent = gameElements.player.shape;
          gameElements.player.placements.push(square.id);
          gameElements.player.isTurn = false;
          gameElements.opponent.isTurn = true;
        } else if (
          gameElements.opponent.isTurn === true &&
          square.textContent === ""
        ) {
          square.textContent = gameElements.opponent.shape;
          gameElements.opponent.placements.push(square.id);
          gameElements.player.isTurn = true;
          gameElements.opponent.isTurn = false;
        }
      })
    );
  };

  return { loadBoard };
})();

gameElements.load();
boardElements.loadBoard();
