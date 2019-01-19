"use strict";
const Square = require("./square_object.js");


// This is the constructor for the Sudoku object.
// The "completed" property is simply an array of 1...9 in order that can be referenced when checking if a unit (unit meaning a row, column, or nonet) has been completed correctly.
// The "rows", "columns", and "nonets" properties are initialised as empty arrays. The makeGrid method is then invoked to populate them.
// makeGrid turns the "rows" property into a 9x9 2D array, containing 81 Square objects. Each has its position in the 2D array as its x and y co-ordinates, and is given 0 as its value.
// makeGrid then turns "columns" and "nonets" into 9x9 2D arrays, pointing to the same 81 Square objects contained in the "rows" 2D array.
// This means that the value of a Square object can be changed from anywhere, and it will be changed for all three 2D arrays.
// The rows are numbered from 0-8, going from top to bottom. The columns are numbered from 0-8, going from left to right.
// Inside a row, the Squares are then indexed by column. For example, this.rows[2][4] would point to the third row from the top, and the fifth Square from the left inside that row.
// Inside a column, the Squares are indexed by row. For example, this.columns[5][1] would point to the sixth column from the left, and the second Square from the top inside that column.
// The nonets are numbered from 0-8, in the order top-left, top-middle, top-right, middle-left, middle-middle, middle-right, bottom-left, bottom-middle, bottom-right.
// The Squares inside each nonet are indexed in the same way. For example, this.nonets[3][7] would point to the middle-left nonet, and the bottom-middle Square inside that nonet.
// Lastly. the "sudoku" property is simply an array containing the three 2D arrays, allowing them to be conveniently looped through as a group.
const Sudoku = function () {
  this.completed = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  this.rows = [];
  this.columns = [];
  this.nonets = [];
  this.makeGrid();
  this.sudoku = [this.rows, this.columns, this.nonets];
};

//  THIS IS WHERE THE CONSTRUCTORS END!!!

// This method takes in one of the 2D arrays as an argument - this.rows, this.columns, or this.nonets - and then returns a 2D array containing the values in each square, not the objects.
Sudoku.prototype.unitsNumbers = function (unitArray) {
  return unitArray.map((unit) => {
    return unit.map((square) => {
      return square.value;
    });
  });
};


// This method takes in a unit as an argument, and returns and array of only its values.
Sudoku.prototype.unitNumbers = function (unit) {
  return unit.map((square) => {
    return square.value;
  })
};

// This method takes in a row index and a column index, and returns the nonet index of the square in which they intersect.
Sudoku.prototype.nonetFromXY = function (row, column) {
  switch (row) {
    case 0:
    case 1:
    case 2:
      switch (column) {
        case 0:
        case 1:
        case 2:
          return 0;
          break;
        case 3:
        case 4:
        case 5:
          return 1;
          break;
        case 6:
        case 7:
        case 8:
          return 2;
          break;
        default:
          return new Error(`Error - only 0...8 are valid column indices. ${column} is not valid.`);
          break;
      }
    case 3:
    case 4:
    case 5:
    switch (column) {
      case 0:
      case 1:
      case 2:
        return 3;
        break;
      case 3:
      case 4:
      case 5:
        return 4;
        break;
      case 6:
      case 7:
      case 8:
        return 5;
        break;
      default:
        return console.error(`Error - only 0...8 are valid column indices. ${column} is not valid.`);
        break;
    }
    case 6:
    case 7:
    case 8:
    switch (column) {
      case 0:
      case 1:
      case 2:
        return 6;
        break;
      case 3:
      case 4:
      case 5:
        return 7;
        break;
      case 6:
      case 7:
      case 8:
        return 8;
        break;
      default:
        return console.error(`Error - only 0...8 are valid column indices. ${column} is not valid.`);
        break;
    }
    default:
      return console.error(`Error - only 0...8 are valid row indices. ${row} is not valid.`);
      break;
  }
};

// This method is invoked inside the constructor to turn this.rows, this.columns, and this.nonets into three 2D arrays of Square objects, each pointing to the same 81 Square objects.
Sudoku.prototype.makeGrid = function () {
  this.constructRows();
  this.constructColumns();
  this.constructNonets();
};

// This method is invoked inside the makeGrid method. It first assigns "rows" to an empty array.
// Then, 9 times:
//   It creates an empty array and appends it to "rows".
//   Then, 9 times:
//     It uses the nonetFromXY method to determine the appropriate nonet from the current row and column being filled.
//     It creates nine Square objects, with row, column, and nonet values determined by its position in the 2D array, and its value set to 0.
//     It appends these nine Square objects to the empty array inside "rows".
// The result is a 9x9 2D array of Square objects. this.rows is then reassigned to the 2D array.
Sudoku.prototype.constructRows = function () {
  const rows = [];
  for (let x = 0; x < 9; x++) {
    let row = [];
    rows.push(row);
    for (let y = 0; y < 9; y++) {
      const nonet = this.nonetFromXY(x, y);
      const square = new Square(x, y, nonet, 0)
      rows[x].push(square);
    }
  }
  this.rows = rows;
}

// This method is invoked inside the makeGrid method. It functions similarly to constructRows, but it does not create new Square objects inside the 2D array.
// Instead, it creates references to the same 81 Square objects contained in this.rows - but indexed by column first, instead of by row.
// this.columns is then reassigned to the resulting 2D array.
Sudoku.prototype.constructColumns = function () {
  const columns = [];
  for (let x = 0; x < 9; x++) {
    let column = [];
    columns.push(column);
    for (let y = 0; y < 9; y++) {
      columns[x].push(this.rows[y][x]);
    }
  }
  this.columns = columns;
}

// This method is invoked inside the makeGrid method. It functions similarly to constructRows, but it does not create new Square objects inside the 2D array.
// Instead, it creates references to the same 81 Square objects contained in this.rows - but indexed by nonet instead of row.
// this.nonets is then reassigned to the resulting 2D array.
Sudoku.prototype.constructNonets = function () {
  this.nonets = [
    [this.rows[0][0], this.rows[0][1], this.rows[0][2], this.rows[1][0], this.rows[1][1], this.rows[1][2], this.rows[2][0], this.rows[2][1], this.rows[2][2]],
    [this.rows[0][3], this.rows[0][4], this.rows[0][5], this.rows[1][3], this.rows[1][4], this.rows[1][5], this.rows[2][3], this.rows[2][4], this.rows[2][5]],
    [this.rows[0][6], this.rows[0][7], this.rows[0][8], this.rows[1][6], this.rows[1][7], this.rows[1][8], this.rows[2][6], this.rows[2][7], this.rows[2][8]],
    [this.rows[3][0], this.rows[3][1], this.rows[3][2], this.rows[4][0], this.rows[4][1], this.rows[4][2], this.rows[5][0], this.rows[5][1], this.rows[5][2]],
    [this.rows[3][3], this.rows[3][4], this.rows[3][5], this.rows[4][3], this.rows[4][4], this.rows[4][5], this.rows[5][3], this.rows[5][4], this.rows[5][5]],
    [this.rows[3][6], this.rows[3][7], this.rows[3][8], this.rows[4][6], this.rows[4][7], this.rows[4][8], this.rows[5][6], this.rows[5][7], this.rows[5][8]],
    [this.rows[6][0], this.rows[6][1], this.rows[6][2], this.rows[7][0], this.rows[7][1], this.rows[7][2], this.rows[8][0], this.rows[8][1], this.rows[8][2]],
    [this.rows[6][3], this.rows[6][4], this.rows[6][5], this.rows[7][3], this.rows[7][4], this.rows[7][5], this.rows[8][3], this.rows[8][4], this.rows[8][5]],
    [this.rows[6][6], this.rows[6][7], this.rows[6][8], this.rows[7][6], this.rows[7][7], this.rows[7][8], this.rows[8][6], this.rows[8][7], this.rows[8][8]]
  ];
}

// This method is used to populate an blank sudoku puzzle with values passed in as a 2D rows array of numbers.
// It loops through each Square of each row of the sudoku puzzle, and sets its value property to the corresponding number in the 2D array passed in as an argument.
Sudoku.prototype.populate2dArray = function (rows) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      this.rows[x][y].value = rows[x][y];
    }
  }
  this.constructCandidates();
};

// This method is used to check, for a single Square object passed in as an argument, which of the numbers in its candidate list can be immediately eliminated.
// To do this, it checks its peers (the other squares in its row,  its column, and its nonet), and removes their values from its candidates list.
// For example, if it finds that a square in the same row has 7 as its value, it would remove 7 from its list of candidates, because 7 is already taken.
Sudoku.prototype.checkPeers = function (square) {
  if (square.candidates.length > 1) {
    square.candidates = square.candidates.filter((candidate) => {
      return !(this.unitNumbers(this.rows[square.row]).includes(candidate));
    });
    square.candidates = square.candidates.filter((candidate) => {
      return !(this.unitNumbers(this.columns[square.column]).includes(candidate));
    });
    square.candidates = square.candidates.filter((candidate) => {
      return !(this.unitNumbers(this.nonets[square.nonet]).includes(candidate));
    });
    // if (square.candidates.length === 1) {
    //   square.value = square.candidates[0];
    // }
  }
};

// This method is used to construct the starting candidate lists when a puzzle is populated. It loops through each Square object in each row, and invokes the checkPeers method on it.
Sudoku.prototype.constructCandidates = function () {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      this.checkPeers(this.rows[x][y]);
    }
  }
};

// This method tests whether a unit (row, column, or nonet) has been correctly filled, with each number 1...9 contained once inside it.
// It checks for equality between this.completed and an array of the values of the unit's Square objects - each stringified allow for comparison.
// If the unit contains each of 1...9 once, the method will return true. Otherwise, it will return false.
Sudoku.prototype.unitComplete = function (unit) {
  return (JSON.stringify(this.completed) === JSON.stringify(unit.map((square) => {
    return square.value;
  }).sort()));
};

// This method tests whether the entire sudoku puzzle has been correctly solved. It checks if every unit returns true when tested with the unitComplete method.
// If every row, every column, and every nonet contains each of 1...9 once - meaning the puzzle has been solved - the method will return true. Otherwise, it will return false.
Sudoku.prototype.sudokuComplete = function () {
  return this.sudoku().every((unitArray) => {
    return unitArray.every((unit) => {
      return this.unitComplete(unit)
    });
  });
}

// This method prints the number values of each Square in each unit in a 2D unit array (this.rows, this.columns, or this.nonets).
// It loops through the 2D array, individually printing each unit's values as an array. This improves readability in the console.
// Lastly, it prints a string of dashes after the last array. This makes it clear where the grid ends - in case multiple grids are being printed after each other.
Sudoku.prototype.printUnitArray = function (unitArray) {
  for (let i = 0; i < 9; i++) {
    console.log(unitArray[i].map((square) => {
      return square.value;
    }));;
  }
  console.log("-----------------------------");
};


// THIS IS WHERE THE SUDOKU PROTOTYPE METHODS END!!!



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
// sudoku1.printUnitArray(sudoku1.rows);

console.log(sudoku1.rows[0][0].candidates);
console.log(sudoku1.rows[1][1].candidates);
console.log(sudoku1.rows[1][0].candidates);


module.exports = Sudoku;
