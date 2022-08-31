const gameGrid = document.getElementById("gameGrid");
const playersForm = document.getElementById("playersForm");
const formContainer = document.getElementById("formContainer");
const playerNames = document.getElementById("playerNames");
const firstPlayerDiv = document.getElementById("firstPlayerDiv");
const secondPlayerDiv = document.getElementById("secondPlayerDiv");
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
            gameGrid.appendChild(div);
        }
    }
    return {gameArray, createGridCells};
})();
const displayController = (function() {
    //Module to control the display
    const toggleClass = function(element) {
        //toggle between visible and invisible class
        element.classList.toggle("visible");
        element.classList.toggle("invisible");
    }
    playersForm.onsubmit = (e) => {
        e.preventDefault()
        const playerOnename = playersForm["playerOneName"].value;
        const playerTwoname = playersForm["playerTwoName"].value;
        const playerOne = player(playerOnename);
        const playerTwo = player(playerTwoname);
        toggleClass(formContainer);
        toggleClass(playerNames);
        firstPlayerDiv.innerText = playerOne.getName();
        secondPlayerDiv.innerText = playerTwo.getName();
    }
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
