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
    // this.container.innerHTML += `<div class="step"> <button id="easy-button" class="diff clear-message" >Easy Sudoku</button> <button id="medium-button" class="diff active clear-message">Medium Sudoku</button> <button id="hard-button" class="diff clear-message">Hard Sudoku</button> </div>`
    this.container.innerHTML += `<div class="step"> <button id="easy-button" class="diff clear-message" >Easy Sudoku</button> <button id="medium-button" class="diff clear-message">Medium Sudoku</button> <button id="custom-button" class="diff clear-message">Custom Sudoku</button> </div>`
    // this.container.innerHTML += `<h1>Sudoku Game</h1> <div class="step"> <button id="easy-button" class="diff" >Easy Sudoku</button>`;
    // this.container.innerHTML += `<button id="medium-button" class="diff active">Medium Sudoku</button>`;
    // this.container.innerHTML += `<button id="hard-button" class="diff">Hard Sudoku</button> </div> `;
    this.container.innerHTML += `<br> <button id="switch-view-button">Show Candidates</button> <br><br> `;
    this.container.innerHTML += `<div id="sudoku-grid-div"> </div> <br> `;
    this.container.innerHTML += `<div id="stopwatch-container"> </div>`;
    this.container.innerHTML += `<button id="check-button" >Check Answer</button> <button id="hint-button">Give Hint</button> <button id="solve-button">Solve</button> <br> <br> <button id="clear-button">Clear</button> <button id="reset-button">Reset</button> `
    // this.container.innerHTML += `<br><br><button onclick="Check Answer Functon()" >Check Answer</button><button onclick="Give Hint Function()">Give Hint</button>`;
    // this.container.innerHTML += `<button id="solve-button">Solve</button>`;
    // this.container.innerHTML += `<button onclick="Clear Function()">Clear</button>`;
    const easyButton = document.querySelector("#easy-button");
    const mediumButton = document.querySelector("#medium-button");
    easyButton.addEventListener("click", () => {
      if (document.querySelector("#string-input-div")) {
        this.container.removeChild(document.querySelector("#string-input-div"));
        this.container.removeChild(document.querySelector("#br1"));
        this.container.removeChild(document.querySelector("#br2"));
      }
      console.log("easy button clicked");
      PubSub.publish("GameView:easy-button-clicked");
      easyButton.setAttribute('disabled', true);
      mediumButton.setAttribute('disabled', true);
      setTimeout(function(){
        easyButton.removeAttribute('disabled');
        mediumButton.removeAttribute('disabled');

      }, 3000)
    });
    mediumButton.addEventListener("click", () => {
      if (document.querySelector("#string-input-div")) {
        this.container.removeChild(document.querySelector("#string-input-div"));
        this.container.removeChild(document.querySelector("#br1"));
        this.container.removeChild(document.querySelector("#br2"));
      }
      PubSub.publish("GameView:medium-button-clicked");
      easyButton.setAttribute('disabled', true);
      mediumButton.setAttribute('disabled', true);
      setTimeout(function(){
        easyButton.removeAttribute('disabled');
        mediumButton.removeAttribute('disabled');
      }, 3000)
    });
    // const hardButton = document.querySelector("#hard-button");
    // hardButton.addEventListener("click", () => {
    //   if (document.querySelector("#string-input-div")) {
    //     this.container.removeChild(document.querySelector("#string-input-div"));
    //     this.container.removeChild(document.querySelector("#br1"));
    //     this.container.removeChild(document.querySelector("#br2"));
    //   }
    //   PubSub.publish("GameView:hard-button-clicked");
    //   hardButton.setAttribute('disabled', true);
    //   setTimeout(function(){
    //     hardButton.removeAttribute('disabled');
    //   }, 3000)
    // });
    const customButton = document.querySelector("#custom-button");
    customButton.addEventListener("click", () => {
      if (document.querySelector("#string-input-div")) {
        this.container.removeChild(document.querySelector("#string-input-div"));
        this.container.removeChild(document.querySelector("#br1"));
        this.container.removeChild(document.querySelector("#br2"));
      }
      const inputDiv = document.createElement("div");
      inputDiv.id = "string-input-div";
      const inputPrompt = document.createElement("p");
      inputPrompt.innerHTML = "Paste your puzzle below as a string of numbers:"
      const stringInput = document.createElement("input");
      const switchButton = document.querySelector("#switch-view-button");
      const br1 = document.createElement("br");
      br1.id = "br1";
      const br2 = document.createElement("br");
      br2.id = "br2"
      inputDiv.appendChild(inputPrompt);
      inputDiv.appendChild(stringInput);
      stringInput.addEventListener("change", (event) => {
        PubSub.publish("GameView:custom-puzzle-entered", event.target.value);
        this.container.removeChild(inputDiv);
        this.container.removeChild(br1);
        this.container.removeChild(br2);
      })
      // inputDiv.innerHTML += "<br>";
      // inputDiv.innerHTML += "<br>";

      this.container.insertBefore(inputDiv, switchButton);
      this.container.insertBefore(br1, switchButton);
      this.container.insertBefore(br2, switchButton);
    })
    const checkButton = document.querySelector("#check-button");
    checkButton.addEventListener("click", () => {
      PubSub.publish("GameView:check-button-clicked");
    })
    const hintButton = document.querySelector("#hint-button");
    hintButton.addEventListener("click", () => {
      PubSub.publish("GameView:hint-button-clicked");
      hintButton.setAttribute('disabled', true);
      setTimeout(function(){
        hintButton.removeAttribute('disabled');
      }, 1500)
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
