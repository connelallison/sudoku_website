"use strict";
const Square = require("./square_constructor.js");

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


//  THIS IS WHERE THE CONSTRUCTOR ENDS!!!


// This method is invoked inside the constructor to turn this.rows, this.columns, and this.nonets into three 2D arrays of Square objects.
// Each 2D array points to the same 81 Square objects.
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
      const square = new Square(x, y, 0)
      rows[x].push(square);
    }
  }
  this.rows = rows;
};

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
};

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
};

module.exports = Sudoku;
