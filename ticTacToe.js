const gameGrid = document.getElementById("gameGrid");
let firstPlayer = true;
const gameBoard = (function() {
    //Module for the game board
    gameArray = [];
    let firstPlayerTurn = true;
    let count = 0;
    const resetVariables = function() {
        //Reset necessery variables for new game
        firstPlayerTurn = true;
        count = 0;
        gameArray = [];
    }
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
            div.addEventListener("click", determineWinner.bind(playerOne, playerTwo));
            gameGrid.appendChild(div);
        }
    }
    const reloadGridCells = function(playerOne, playerTwo) {
        //delete all gridCells and generate new cells with the current gameArray Items
        while(gameGrid.firstChild) gameGrid.removeChild(gameGrid.lastChild);
        createGridCells(playerOne, playerTwo);
    }
    const determineWinner = function(playerTwo, e) {
        //check if there is three of the same marker in a row
        //If so determine winner
        //this = playerOne
        if (typeof gameArray[4] != "undefined") {
            if ((gameArray[4]===gameArray[3] && gameArray[4]===gameArray[5]) || 
                (gameArray[4]===gameArray[1] && gameArray[4]===gameArray[7]) ||
                (gameArray[4]===gameArray[2] && gameArray[4]===gameArray[6]) ||
                (gameArray[4]===gameArray[0] && gameArray[4]===gameArray[8])) {
                    if (gameArray[4]==="X") displayController.displayWinner(this);
                    else displayController.displayWinner(playerTwo);
            }
        if (typeof gameArray[0] != "undefined") {
            if ((gameArray[0]===gameArray[1] && gameArray[0]===gameArray[2])||
                (gameArray[0]==gameArray[3] && gameArray[0]==gameArray[6])) {
                    if (gameArray[0]==="X") displayController.displayWinner(this);
                    else displayController.displayWinner(playerTwo);
            }
        }
        if (typeof gameArray[8] != "undefined") {
            if ((gameArray[8]===gameArray[2] && gameArray[8]===gameArray[5])||
                (gameArray[8]==gameArray[6] && gameArray[8]==gameArray[7])) {
                    if (gameArray[8]==="X") displayController.displayWinner(this);
                    else displayController.displayWinner(playerTwo);
            }
        }
        //Determine if the game is tie
        if (gameArray[e.target.id] === "X") count++;
        if (count===5) displayController.displayTie();
        }
    }
    return {createGridCells, resetVariables};
})();
const displayController = (function() {
    //Module to control the display
    const playersForm = document.getElementById("playersForm");
    const formContainer = document.getElementById("formContainer");
    const playerNames = document.getElementById("playerNames");
    const firstPlayerDiv = document.getElementById("firstPlayerDiv");
    const secondPlayerDiv = document.getElementById("secondPlayerDiv");
    const model = document.getElementById("model");
    const winningMessage = document.getElementById("winningMessage");
    const restart = document.getElementById("restart");
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
    const displayWinner = function(winner) {
        //display model and announce the winner
        const name = winner.getName();
        winningMessage.innerText = `${name} is the winner of this game`;
        toggleVisibility(model);
    }
    const displayTie = function() {
        //Display message when the game is a tie
        winningMessage.innerText = "It's a tie";
        toggleVisibility(model);
    }
    const restartGame = function() {
        gameBoard.resetVariables();
        while(gameGrid.firstChild) gameGrid.removeChild(gameGrid.lastChild);
        toggleVisibility(model);
        toggleVisibility(playerNames);
        toggleVisibility(formContainer);
    }
    restart.onclick = restartGame
    return {displayWinner, displayTie};
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
