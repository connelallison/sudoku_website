"use strict";
const PubSub = require('../helpers/pub_sub.js');
const SudokuValuesView = require("./sudoku_values_view.js");
const SudokuCandidatesView = require("./sudoku_candidates_view.js");
const Stopwatch = require("./stopwatch.js");

const GameView = function (container) {
  this.container = container;
}

GameView.prototype.showGame = function () {
  PubSub.subscribe("Hub:render-sudoku-grid", () => {
    this.container.innerHTML = "";
    this.container.innerHTML += "<h1>Sudoku Game</h1>";
    this.container.innerHTML += `<div class="step"> <button id="easy-button" class="diff" >Easy Sudoku</button> <button id="medium-button" class="diff active">Medium Sudoku</button> <button id="hard-button" class="diff">Hard Sudoku</button> </div>`
    // this.container.innerHTML += `<h1>Sudoku Game</h1> <div class="step"> <button id="easy-button" class="diff" >Easy Sudoku</button>`;
    // this.container.innerHTML += `<button id="medium-button" class="diff active">Medium Sudoku</button>`;
    // this.container.innerHTML += `<button id="hard-button" class="diff">Hard Sudoku</button> </div> `;
    this.container.innerHTML += `<br> <button id="switch-view-button">Show Candidates</button> <br><br> `;
    this.container.innerHTML += `<div id="sudoku-grid-div"> </div> <br> `;
    this.container.innerHTML += `<div id="stopwatch-container"> </div>`;
    this.container.innerHTML += `<button id="check-button" >Check Answer</button> <button id="hint-button">Give Hint</button> <button id="solve-button">Solve</button> <br> <button id="clear-button">Clear</button> <button id="reset-button">Reset</button> `
    // this.container.innerHTML += `<br><br><button onclick="Check Answer Functon()" >Check Answer</button><button onclick="Give Hint Function()">Give Hint</button>`;
    // this.container.innerHTML += `<button id="solve-button">Solve</button>`;
    // this.container.innerHTML += `<button onclick="Clear Function()">Clear</button>`;
    const easyButton = document.querySelector("#easy-button");
    easyButton.addEventListener("click", () => {
      console.log("easy button clicked");
      PubSub.publish("GameView:easy-button-clicked");
    });
    const mediumButton = document.querySelector("#medium-button");
    mediumButton.addEventListener("click", () => {
      PubSub.publish("GameView:medium-button-clicked");
    });
    const hardButton = document.querySelector("#hard-button");
    hardButton.addEventListener("click", () => {
      PubSub.publish("GameView:hard-button-clicked");
    });
    const checkButton = document.querySelector("#check-button");
    checkButton.addEventListener("click", () => {
      PubSub.publish("GameView:check-button-clicked");
    })
    const hintButton = document.querySelector("#hint-button");
    hintButton.addEventListener("click", () => {
      PubSub.publish("GameView:hint-button-clicked");
    })
    const solveButton = document.querySelector("#solve-button");
    solveButton.addEventListener("click", () => {
      PubSub.publish("GameView:solve-button-clicked");
    })
    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", () => {
      PubSub.publish("GameView:clear-button-clicked");
    })
    const resetButton = document.querySelector("#reset-button");
    resetButton.addEventListener("click", () => {
      PubSub.publish("GameView:reset-button-clicked");
    })
    const switchViewButton = document.querySelector("#switch-view-button");
    switchViewButton.addEventListener("click", () => {
      PubSub.publish("GameView:switch-button-clicked");
    })
    const sudokuGridDiv = document.querySelector("#sudoku-grid-div")
    const sudokuValuesView = new SudokuValuesView(sudokuGridDiv);
    sudokuValuesView.bindEvents();
    // sudokuValuesView.render(sudokuValues);
    const sudokuCandidatesView = new SudokuCandidatesView(sudokuGridDiv);
    sudokuCandidatesView.bindEvents();

  });
}

module.exports = GameView;
