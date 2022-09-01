const gameGrid = document.getElementById("gameGrid");
const playersForm = document.getElementById("playersForm");
const formContainer = document.getElementById("formContainer");
const playerNames = document.getElementById("playerNames");
const firstPlayerDiv = document.getElementById("firstPlayerDiv");
const secondPlayerDiv = document.getElementById("secondPlayerDiv");
const gameBoard = (function() {
    //Module for the game board
    gameArray = [];
    let firstPlayerTurn = true;
    const gridCellCallback = function(e) {
        //get players marker!!!!
        let id = e.target.id
        if (typeof gameArray[id] == "undefined") {
            if (firstPlayerTurn) {

            }
        }
    }
    const createGridCells = function() {
        for (let i = 0; i < 9; i++) {
            //create gridcells for the gameboard
            //populate from the gameArray
            div = document.createElement("div");
            div.setAttribute("id", i);
            div.textContent = gameArray[i];
            div.addEventListener("click", gridCellCallback);
            gameGrid.appendChild(div);
        }
    }
    return {gameArray, createGridCells};
})();
const displayController = (function() {
    //Module to control the display
    let playerOne;
    let playerTwo;
    const toggleVisibility = function(element) {
        //toggle between visible and invisible class
        element.classList.toggle("visible");
        element.classList.toggle("invisible");
    }
    const formManagement = function(e) {
        e.preventDefault()
        playerOne = player(playersForm["playerOneName"].value);
        playerTwo = player(playersForm["playerTwoName"].value);
        toggleVisibility(formContainer);
        toggleVisibility(playerNames);
        firstPlayerDiv.innerText = playerOne.getName();
        secondPlayerDiv.innerText = playerTwo.getName();
        gameBoard.createGridCells();
        return {playerOne, playerTwo};
    }
    playersForm.onsubmit = formManagement;
    return {};
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
