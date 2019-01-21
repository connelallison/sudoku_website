const Hub = require('./models/hub.js');
const SudokuPopulate = require('./models/sudoku_logic/sudoku_populate')

document.addEventListener('DOMContentLoaded', () => {

  console.log('Javascript loaded');

  const sudokuPopulate = new SudokuPopulate();
  sudokuPopulate.bindEventsPopulate();

  const hub = new Hub();
  // hub.bindEvents();
  hub.getData();
})
