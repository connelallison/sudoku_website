"use strict";
const Sudoku = require("./sudoku_logic/sudoku_populate.js");





Sudoku.prototype.bindEventsPopulate = function(){
  PubSub.subscribe('Hub:sudoku-data-received', (event) => {
    const data = event.detail;
    this.populate2dArray(data)
    console.log('bindevents', data)
  })
}








const sudoku1 = new Sudoku();
// console.log(sudoku1.rows);
const sudoku1rows = [
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

const sudoku1complete = new Sudoku();
const sudoku1completeRows = [
[1, 7, 2, 9, 8, 3, 5, 6, 4],
[4, 6, 8, 5, 7, 2, 9, 1, 3],
[5, 3, 9, 6, 1, 4, 8, 7, 2],
[2, 1, 3, 8, 5, 6, 4, 9, 7],
[8, 4, 6, 3, 9, 7, 2, 5, 1],
[9, 5, 7, 2, 4, 1, 3, 8, 6],
[6, 8, 4, 7, 2, 5, 1, 3, 9],
[3, 9, 1, 4, 6, 8, 7, 2, 5],
[7, 2, 5, 1, 3, 9, 6, 4, 8]
];

sudoku1.populate2dArray(sudoku1rows);
sudoku1complete.populate2dArray(sudoku1completeRows);

// console.log(sudoku1.rows);
// console.log(sudoku1.columns);
// console.log(sudoku1.nonets;
// console.log(sudoku1.sudoku());
// console.log(sudoku1.rowsNumbers());
// console.log(sudoku1.columnsNumbers());
sudoku1.printUnitArray(sudoku1.rows);
// sudoku1.printUnitArray(sudoku1.columns);
// sudoku1.printUnitArray(sudoku1.nonets);

// console.log(sudoku1.unitsNumbers(sudoku1.rows));
// console.log(sudoku1.unitsNumbers(sudoku1.columns));
// console.log(sudoku1.unitsNumbers(sudoku1.nonets));
//
// console.log(sudoku1.sudokuComplete());
// console.log(sudoku1complete.sudokuComplete());

// console.log({x: 0, y: 0, value: 0, candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9]});
// const test = (JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]));
//
// console.log(test);

// console.log(sudoku1.unitComplete([3, 5, 7, 6, 2, 4, 1, 9, 8]));


// const rowsTestMemory = [
//   [{value:1}, {value:2}],
//   [{value:3}, {value:4}],
// ];
//
// const columnsTestMemory = [
//   [rowsTestMemory[0][0], rowsTestMemory[1][0]],
//   [rowsTestMemory[0][1], rowsTestMemory[1][1]]
// ];
//
// console.log(rowsTestMemory[0][0].value);
// console.log(rowsTestMemory[0][1].value);
// console.log(rowsTestMemory[1][0].value);
// console.log(rowsTestMemory[1][1].value);
//
// console.log(columnsTestMemory[0][0].value);
// console.log(columnsTestMemory[0][1].value);
// console.log(columnsTestMemory[1][0].value);
// console.log(columnsTestMemory[1][1].value);
//
// rowsTestMemory[0][0].value = 42;
// console.log(rowsTestMemory[0][0].value);
// console.log(columnsTestMemory[0][0].value);

// console.log(sudoku1.nonetFromXY(0, 9));

// console.log(sudoku1.rows[0][5]);
// console.log(sudoku1.rows[2][5]);
// console.log(sudoku1.rows[1][1]);
// sudoku1.constructCandidates();
// console.log(sudoku1.rows[0][5]);
// console.log(sudoku1.rows[2][5]);
// console.log(sudoku1.rows[1][1]);
// sudoku1.printUnitArray(sudoku1.rows);

// console.log(sudoku1.rows[0][0].candidates);
// console.log(sudoku1.rows[1][1].candidates);
// console.log(sudoku1.rows[1][0].candidates);


module.exports = Sudoku;
