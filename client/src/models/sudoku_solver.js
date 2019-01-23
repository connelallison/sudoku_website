"use strict";
const Sudoku = require("./sudoku_logic/sudoku_populate.js");














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

const sudoku2 = new Sudoku();
const sudoku2string = "500200010001900730000000800050020008062039000000004300000000000080467900007300000";
const sudoku3 = new Sudoku();
const sudoku3string = "000023000004000100050084090001070902093006000000010760000000000800000004060000587";

const sudoku4 = new Sudoku();
const sudoku4rows = [
  [9, 0, 8, 0, 5, 7, 0, 4, 1],
  [0, 5, 0, 0, 0, 0, 6, 0, 2],
  [6, 1, 0, 0, 2, 3, 0, 0, 0],
  [0, 0, 9, 4, 0, 0, 0, 0, 8],
  [5, 8, 0, 0, 0, 0, 0, 1, 7],
  [1, 0, 0, 0, 0, 8, 2, 0, 0],
  [0, 0, 0, 3, 8, 0, 0, 2, 9],
  [2, 0, 5, 0, 0, 0, 0, 6, 0],
  [8, 3, 0, 2, 6, 0, 7, 0, 4]
];

const sudoku5 = new Sudoku();
const sudoku5string = "050007690000040000009000000000100004000230008008000150000400003006080209002005000";
const sudoku6 = new Sudoku();
const sudoku6string = "005100000600003000300000706000030601009050400802090000401000005000500008000007200";

const sudoku7 = new Sudoku();
const sudoku7squares = [
  {"x":0,"y":1,"value":2},{"x":0,"y":2,"value":1},{"x":0,"y":5,"value":7},{"x":0,"y":7,"value":8},{"x":1,"y":0,"value":8},{"x":1,"y":1,"value":6},{"x":1,"y":4,"value":2},{"x":1,"y":7,"value":5},{"x":1,"y":8,"value":9},{"x":2,"y":0,"value":7},{"x":2,"y":2,"value":4},{"x":2,"y":4,"value":9},{"x":2,"y":5,"value":8},{"x":2,"y":6,"value":2},{"x":3,"y":1,"value":3},{"x":3,"y":2,"value":9},{"x":3,"y":3,"value":1},{"x":3,"y":5,"value":5},{"x":3,"y":7,"value":6},{"x":4,"y":1,"value":8},{"x":4,"y":2,"value":6},{"x":4,"y":3,"value":9},{"x":4,"y":6,"value":5},{"x":4,"y":7,"value":1},{"x":5,"y":0,"value":1},{"x":5,"y":3,"value":2},{"x":5,"y":5,"value":6},{"x":5,"y":6,"value":4},{"x":5,"y":8,"value":3},{"x":6,"y":2,"value":7},{"x":6,"y":4,"value":1},{"x":6,"y":7,"value":4},{"x":6,"y":8,"value":6},{"x":7,"y":4,"value":6},{"x":7,"y":6,"value":1},{"x":8,"y":0,"value":6},{"x":8,"y":1,"value":1},{"x":8,"y":5,"value":4},{"x":8,"y":6,"value":9},{"x":8,"y":7,"value":7}
];
const sudoku8 = new Sudoku();
const sudoku8squares = [
  {"x":0,"y":1,"value":2},{"x":0,"y":2,"value":1},{"x":0,"y":3,"value":9},{"x":0,"y":6,"value":4},{"x":1,"y":2,"value":6},{"x":1,"y":3,"value":7},{"x":1,"y":4,"value":8},{"x":1,"y":5,"value":2},{"x":2,"y":3,"value":6},{"x":2,"y":8,"value":7},{"x":3,"y":1,"value":8},{"x":3,"y":2,"value":4},{"x":3,"y":5,"value":1},{"x":3,"y":7,"value":9},{"x":4,"y":0,"value":6},{"x":4,"y":3,"value":4},{"x":4,"y":4,"value":9},{"x":4,"y":5,"value":8},{"x":4,"y":6,"value":7},{"x":4,"y":8,"value":5},{"x":5,"y":0,"value":5},{"x":5,"y":1,"value":7},{"x":5,"y":2,"value":9},{"x":5,"y":5,"value":6},{"x":5,"y":7,"value":8},{"x":5,"y":8,"value":4},{"x":6,"y":4,"value":5},{"x":6,"y":5,"value":7},{"x":6,"y":6,"value":6},{"x":6,"y":7,"value":4},{"x":6,"y":8,"value":1},{"x":7,"y":3,"value":1},{"x":7,"y":4,"value":4},{"x":7,"y":5,"value":3},{"x":8,"y":0,"value":1},{"x":8,"y":2,"value":5},{"x":8,"y":3,"value":2},{"x":8,"y":6,"value":8},{"x":8,"y":7,"value":7},{"x":8,"y":8,"value":3}
];

const sudoku9 = new Sudoku();
const sudoku9rows = [
  [7, 0, 4, 0, 0, 0, 2, 0, 9],
  [6, 8, 3, 2, 9, 5, 0, 1, 0],
  [2, 0, 0, 0, 4, 7, 0, 0, 3],
  [0, 0, 0, 4, 0, 6, 0, 5, 0],
  [1, 4, 7, 5, 0, 9, 6, 3, 2],
  [8, 6, 5, 0, 2, 3, 9, 4, 1],
  [5, 3, 8, 9, 7, 4, 1, 2, 6],
  [4, 7, 6, 1, 5, 2, 0, 9, 8],
  [9, 1, 2, 0, 0, 0, 0, 7, 5]
];

// As of writing this, this puzzle will cause the solver to make mistakes - for example, 9 appears twice in column 2, 1 appears twice inside row 9, column 8, and nonet 2, etc.
const sudoku10 = new Sudoku();
const sudoku10rows = [
  [0, 8, 2, 3, 6, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 8, 0, 0],
  [0, 3, 0, 1, 0, 4, 0, 0, 6],
  [2, 5, 0, 4, 3, 0, 0, 8, 0],
  [4, 0, 7, 0, 0, 0, 3, 6, 2],
  [0, 6, 3, 0, 1, 2, 0, 5, 0],
  [0, 0, 0, 6, 0, 1, 2, 9, 5],
  [5, 0, 0, 2, 0, 3, 0, 0, 8],
  [1, 2, 6, 0, 5, 0, 0, 7, 3]
];

// console.log(sudoku1.rows[0][3].value);
// console.log(sudoku1.rows[0][3].candidates);

// sudoku1.populate2dArray(sudoku1rows);
// sudoku1.attemptFillValue(sudoku1.rows[0][0], 2);
// console.log(sudoku1.stringify());
// sudoku1complete.populate2dArray(sudoku1completeRows);
// sudoku2.populateString(sudoku2string);
// sudoku3.populateString(sudoku3string);
// sudoku4.populate2dArray(sudoku4rows);
// sudoku5.populateString(sudoku5string);
// sudoku6.populateString(sudoku6string);
// sudoku7.populateApiRequest(sudoku7squares);
// sudoku8.populateApiRequest(sudoku8squares);

// sudoku7.printUnitArray(sudoku7.rows);
// sudoku7.solve();
// sudoku8.printUnitArray(sudoku8.rows);
// sudoku8.solve();
// sudoku10.populate2dArray(sudoku10rows);
// sudoku10.solve();

// console.log(sudoku1.rows);
// console.log(sudoku1.columns);
// console.log(sudoku1.nonets;
// console.log(sudoku1.sudoku());
// console.log(sudoku1.rowsNumbers());
// console.log(sudoku1.columnsNumbers());
// sudoku1.printUnitArray(sudoku1.rows);
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

// console.log(sudoku1.rows[0][0].candidates);
// console.log(sudoku1.rows[1][1].candidates);
// console.log(sudoku1.rows[1][0].candidates);

// sudoku1.printUnitArray(sudoku1.rows);
// sudoku1.solve();
// sudoku4.printUnitArray(sudoku4.rows);
// sudoku4.solve();
// sudoku1.updatePeers(sudoku1.rows[0][5])
// sudoku1.printUnitArray(sudoku1.rows);
// console.log(sudoku1.rows[0][0].candidates);
// console.log(sudoku1.rows[0][1].candidates);
// console.log(sudoku1.rows[0][5].candidates);
// sudoku1.rows[0].forEach((square) => {
//   console.log(square.candidates);
// });
// sudoku1.rows[0][0]
// sudoku1.updatePeers
// sudoku1.fillOneCandidates();
// sudoku1.printUnitArray(sudoku1.rows);
// console.log(sudoku1.rows[0][0].candidates);
// console.log(sudoku1.rows[0][1].candidates);
// console.log(sudoku1.rows[0][5].candidates);

// console.log(sudoku1.rows[0][0].peers);
// console.log(sudoku1.rows[1][1].peers);
// console.log(sudoku1.rows[1][0].peers);
// console.log(sudoku1.getPeers(sudoku1.rows[1][1]).map((peer) => {
//   return peer.value;
// }));

// sudoku2.printUnitArray(sudoku2.rows);
// sudoku2.solve();


// console.log(sudoku3.rows[6][3].candidates);
// console.log(sudoku3.rows[7][3].candidates);

// console.log(sudoku3.rows[6][8].candidates);
// console.log(sudoku3.rows[6][7].candidates);
// console.log(sudoku3.rows[6][6].candidates);
// console.log(sudoku3.rows[7][7].candidates);
// console.log(sudoku3.rows[7][6].candidates);
// console.log(sudoku3.rows[2][7].candidates);
// console.log(sudoku3.rows[3][6].candidates);

// console.log(sudoku3.nonets[8].map((square) => {
//   if (square.candidates.includes(9)) {
//     return [square.row, square.column]
//   }
// }));
//
// sudoku3.printUnitArray(sudoku3.rows);
// sudoku3.solve();

// sudoku5.printUnitArray(sudoku5.rows);
// sudoku5.solve();

// sudoku6.printUnitArray(sudoku6.rows);
// sudoku6.solve();
//
// console.log(sudoku6.rows[1][2].candidates);
// console.log(sudoku6.rows[2][2].candidates);
//
// // console.log(sudoku2.rows[6][6].candidates);
// // console.log(sudoku2.rows[6][7].candidates);
// console.log(sudoku3.rows[6][3].candidates);
// console.log(sudoku3.rows[7][3].candidates);
// console.log(sudoku3.rows[8][6].candidates);

// console.log(sudoku3.rows[0][3].candidates);
// console.log(sudoku3.rows[2][3].candidates);
// console.log(sudoku3.rows[4][3].candidates);
// console.log(sudoku3.rows[6][3].candidates);
// console.log(sudoku3.rows[7][3].candidates);
// console.log(sudoku3.rows[8][3].candidates);
// console.log(sudoku3.rows[0][4].candidates);
// console.log(sudoku3.rows[0][4].value);
// console.log(sudoku3.rows[1][4].candidates);
// console.log(sudoku3.rows[1][5].candidates);
// console.log(sudoku3.missingNumbers(sudoku3.columns[3]));
// console.log(sudoku3.emptySquares(sudoku3.columns[3]));


module.exports = Sudoku;
