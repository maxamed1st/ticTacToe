const gameGrid = document.getElementById("gameGrid");
const playersForm = document.getElementById("playersForm");
const formContainer = document.getElementById("formContainer");
const playerNames = document.getElementById("playerNames");
const firstPlayerDiv = document.getElementById("firstPlayerDiv");
const secondPlayerDiv = document.getElementById("secondPlayerDiv");
let firstPlayer = true;
const gameBoard = (function() {
    //Module for the game board
    gameArray = [];
    let firstPlayerTurn = true;
    const gridCellCallback = function(playerTwo, e) {
        //get players marker and add to gridcell on click
        //this = playerOne
        const markerX = this.getMarker();
        const markerO = playerTwo.getMarker();
        const id = e.target.id
        if (typeof gameArray[id] == "undefined") {
            if (firstPlayerTurn) {
                gameArray[id] = markerX;
                firstPlayerTurn = false
            } else {
                gameArray[id] = markerO;
                firstPlayerTurn = true;
            }
            reloadGridCells(this, playerTwo);
        }
    }
    const createGridCells = function(playerOne, playerTwo) {
        for (let i = 0; i < 9; i++) {
            //create gridcells for the gameboard
            //populate from the gameArray
            div = document.createElement("div");
            div.setAttribute("id", i);
            div.textContent = gameArray[i];
            div.addEventListener("click", gridCellCallback.bind(playerOne, playerTwo));
            gameGrid.appendChild(div);
        }
    }
    const reloadGridCells = function(playerOne, playerTwo) {
        //delete all gridCells and generate new cells with the current gameArray Items
        while(gameGrid.firstChild) gameGrid.removeChild(gameGrid.lastChild);
        createGridCells(playerOne, playerTwo);
    }
    return {createGridCells};
})();
const displayController = (function() {
    //Module to control the display
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
        gameBoard.createGridCells(playerOne, playerTwo);
    }
    playersForm.onsubmit = formManagement;
    return {};
})();
const player = function(name) {
    //Factory function for players
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
