const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');
const Sudoku = require('./sudoku_solver.js')

const Hub = function (){
  this.sudoku = null;
  this.displaysCandidates = false;
};

Hub.prototype.bindEvents = function () {
  const easyButton = document.querySelector("#easy-button");
  easyButton.addEventListener("click", () => {
    this.getDataEasy();
  });
  const solveButton = document.querySelector("#solve-button");
  solveButton.addEventListener("click", () => {
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
  });
}

module.exports = Hub;
