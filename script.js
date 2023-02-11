const gameElements = (function () {
  const startMenu = document.querySelector(".start-menu");
  const gameBoard = document.querySelector(".game-board");
  const startGameButton = document.querySelector(".start-game");
  const xSelectorButton = document.querySelector(".x-selector");
  const oSelectorButton = document.querySelector(".o-selector");
  let playerSelection = null;

  const load = () => {
    startGameButton.addEventListener("click", () => {
      if (playerSelection !== null) {
        startMenu.style.display = "none";
        gameBoard.style.display = "grid";
      }
    });
    xSelectorButton.addEventListener("click", () => {
      if (playerSelection !== "X") {
        oSelectorButton.style.backgroundColor = "#a3abd8";
        xSelectorButton.style.backgroundColor = "#717797";
        playerSelection = "X";
      }
    });
    oSelectorButton.addEventListener("click", () => {
      if (playerSelection !== "O") {
        xSelectorButton.style.backgroundColor = "#a3abd8";
        oSelectorButton.style.backgroundColor = "#717797";
        playerSelection = "O";
      }
    });
  };

  return { load, playerSelection };
})();

gameElements.load();
