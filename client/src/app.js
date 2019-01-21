const Hub = require('./models/hub.js');
const Sudoku = require('./models/sudoku_solver.js');
const SudokuValuesView = require("./views/sudoku_values_view.js");
const SudokuCandidatesView = require("./views/sudoku_candidates_view.js");
const PubSub = require('./helpers/pub_sub.js');


document.addEventListener('DOMContentLoaded', () => {

  console.log('Javascript loaded');

// temporary code for passing a hardcoded sudoku to the view - will be replaced later.
  const sudoku = new Sudoku();
  const sudokuRows = [
    [0, 0, 2, 9, 8, 0, 5, 0, 0],
    [4, 0, 0, 0, 7, 0, 0, 1, 3],
    [0, 3, 9, 6, 0, 4, 0, 7, 0],
    [2, 0, 0, 0, 5, 6, 4, 0, 0],
    [8, 4, 0, 3, 0, 0, 2, 0, 1],
    [9, 0, 7, 0, 0, 1, 0, 8, 6],
    [6, 0, 0, 7, 0, 5, 1, 3, 0],
    [0, 9, 1, 4, 0, 0, 0, 0, 5],
    [0, 2, 0, 0, 3, 0, 6, 0, 8]
  ];
  sudoku.populate2dArray(sudokuRows);
  let sudokuValues = sudoku.unitsNumbers(sudoku.rows);
  let sudokuCandidates = sudoku.unitsCandidates(sudoku.rows);

  const switchViewButton = document.querySelector("#switch-view-button");
  switchViewButton.addEventListener("click", () => {
    PubSub.publish("App:switch-view-clicked", )
  })

  const sudokuGridDiv = document.querySelector("#sudoku-grid-div")
  const sudokuValuesView = new SudokuValuesView(sudokuGridDiv);
  sudokuValuesView.bindEvents();
  // sudokuValuesView.render(sudokuValues);
  const sudokuCandidatesView = new SudokuCandidatesView(sudokuGridDiv);
  sudokuCandidatesView.bindEvents();

  // sudokuCandidatesView.render(sudokuCandidates);


  const hub = new Hub();
  hub.bindEvents();
  // hub.getDataEasy();
})
