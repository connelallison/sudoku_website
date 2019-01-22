const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');
const Sudoku = require('./sudoku_solver.js')

const Hub = function (){
  this.sudoku = null;
  this.displaysCandidates = false;
};

Hub.prototype.bindEvents = function () {
  PubSub.subscribe("SudokuValuesView:attempt-fill-value", (event) => {
    const row = event.detail[0];
    const column = event.detail[1];
    const square = this.sudoku.rows[row][column];
    const value = event.detail[2];
    console.log("row:", row);
    console.log("column:", column);
    console.log("value:", value);
    console.log("square:", square);
    if (this.sudoku.attemptFillValue(square, value)) {
      PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
      console.log("value accepted, re-rendering view");
    } else {
      PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
      // PubSub.publish("Hub:value-rejected", square.peerCoords())
      console.log("value rejected, re-rendering view");
      // PubSub.publish("Hub:illegal-move");
    }

  })

  const easyButton = document.querySelector("#easy-button");
  easyButton.addEventListener("click", () => {
    this.getDataEasy();
  });
  const mediumButton = document.querySelector("#medium-button");
  mediumButton.addEventListener("click", () => {
    this.getDataMedium();
  });
  const hardButton = document.querySelector("#hard-button");
  hardButton.addEventListener("click", () => {
    this.getDataHard();
  });
  const solveButton = document.querySelector("#solve-button");
  solveButton.addEventListener("click", () => {
    PubSub.publish("Hub:puzzle-ends");
    this.sudoku.solve();
    PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
    this.displaysCandidates = false;
  })
  const switchViewButton = document.querySelector("#switch-view-button");
  switchViewButton.addEventListener("click", () => {
    if (this.sudoku) {
      if (this.displaysCandidates) {
        PubSub.publish("Hub:render-values-view", this.sudoku.unitsNumbers(this.sudoku.rows));
        this.displaysCandidates = false;
      } else {
        PubSub.publish("Hub:render-candidates-view", this.sudoku.unitsCandidates(this.sudoku.rows));
        this.displaysCandidates = true;
      }
    }
  })
}

Hub.prototype.getDataEasy = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1');
  request.get().then((data) => {
    const sudokuData = data.squares;
    console.log('sudoku data received', sudokuData);
    const sudoku = new Sudoku();
    sudoku.populateApiRequest(sudokuData);
    this.sudoku = sudoku;
    PubSub.publish('Hub:render-values-view', this.sudoku.unitsNumbers(this.sudoku.rows));
    PubSub.publish("Hub:puzzle-begins")
  });
}

Hub.prototype.getDataMedium = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=2');
  request.get().then((data) => {
    const sudokuData = data.squares;
    console.log('sudoku data received medium', sudokuData);
    const sudoku = new Sudoku();
    sudoku.populateApiRequest(sudokuData);
    this.sudoku = sudoku;
    PubSub.publish('Hub:render-values-view',
    this.sudoku.unitsNumbers(this.sudoku.rows));
    PubSub.publish("Hub:puzzle-begins")
  });
}

Hub.prototype.getDataHard = function(){
  const request = new Request('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=3');
  request.get().then((data) => {
    const sudokuData = data.squares;
    console.log('sudoku data received hard', sudokuData);
    const sudoku = new Sudoku();
    sudoku.populateApiRequest(sudokuData);
    this.sudoku = sudoku;
    PubSub.publish('Hub:render-values-view',
    this.sudoku.unitsNumbers(this.sudoku.rows));
    PubSub.publish("Hub:puzzle-begins")
  });
}

module.exports = Hub;
