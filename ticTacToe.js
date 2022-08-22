let main = document.querySelector("main");
const gameBoard = (function() {
    //Module for the game board
    gameArray = ["x", "o", "x", "o", "x", "x", "o", "x", "o"];
    const createGridCells = function() {
        for (let i = 0; i < 9; i++) {
            //create gridcells for the gameboard
            //populate from the gameArray
            div = document.createElement("div");
            div.setAttribute("id", i);
            div.textContent = gameArray[i];
            main.appendChild(div);
        }
    }
    return {gameArray, createGridCells};
})();
const displayController = (function() {
    //Module to control the display
})();
const player = function(name) {
    //Factory function for players
    let firstPlayer = true;
    const getName = () => name;
    const getMarker = () => {
        let marker;
        if (firstPlayer) {
            marker = "X";
            firstPlayer = false;
        } else {
            marker = "O"
            firstPlayer = true;
        }
        return marker;
    }
    return {getName, getMarker};
}
const mainFunc = function() {
    //Main function to bring together the previouse functions and interconnect them!
    gameBoard.createGridCells();
}
mainFunc()
