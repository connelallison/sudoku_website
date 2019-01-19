"use strict";
const Sudoku = require("./sudoku_constructor.js");


// This method takes in a unit as an argument, and returns and array of only its values.
// It is invoked in unitsNumbers(), unitComplete(), and printUnitArray().
Sudoku.prototype.unitNumbers = function (unit) {
  return unit.map((square) => {
    return square.value;
  })
};

// This method takes in one of the 2D arrays as an argument - this.rows, this.columns, or this.nonets - and then returns a 2D array containing the values in each square, not the objects.
Sudoku.prototype.unitsNumbers = function (unitArray) {
  return unitArray.map((unit) => {
    return this.unitNumbers(unit);
  });
};

// This method tests whether a unit (row, column, or nonet) has been correctly filled, with each number 1...9 contained once inside it.
// It checks for equality between this.completed and an array of the values of the unit's Square objects - each stringified to allow for comparison.
// If the unit contains each of 1...9 once, the method will return true. Otherwise, it will return false.
// This method is invoked inside sudokuComplete();
Sudoku.prototype.unitComplete = function (unit) {
  return (JSON.stringify(this.completed) === JSON.stringify(this.unitNumbers(unit).sort()));
};

// This method tests whether the entire sudoku puzzle has been correctly solved. It checks if every unit returns true when tested with the unitComplete method.
// If every row, every column, and every nonet contains each of 1...9 once - meaning the puzzle has been solved - the method will return true. Otherwise, it will return false.
Sudoku.prototype.sudokuComplete = function () {
  return this.sudoku().every((unitArray) => {
    return unitArray.every((unit) => {
      return this.unitComplete(unit)
    });
  });
};

// This method prints the number values of each Square in each unit in a 2D unit array (this.rows, this.columns, or this.nonets).
// It loops through the 2D array, individually printing each unit's values as an array. This improves readability in the console.
// Lastly, it prints a string of dashes after the last array. This makes it clear where the grid ends - in case multiple grids are being printed after each other.
// This method is used during development to print sudoku grids to the console in a readable form without requiring a GUI. It is not meant to be used for anything else.
Sudoku.prototype.printUnitArray = function (unitArray) {
  for (let i = 0; i < 9; i++) {
    console.log(this.unitNumbers(unitArray[i]));;
  }
  console.log("-----------------------------");
};


// This method takes in a row index and a column index, and returns the nonet index of the square in which they intersect.
// It is invoked inside the constructRows() method.
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
        return new Error(`Error - only 0...8 are valid column indices. ${column} is not valid.`);
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
        return new Error(`Error - only 0...8 are valid column indices. ${column} is not valid.`);
        break;
    }
    default:
      return new Error(`Error - only 0...8 are valid row indices. ${row} is not valid.`);
      break;
  }
};

// This method is used to check, for a single Square object passed in as an argument, which of the numbers in its candidate list can be immediately eliminated.
// To do this, it checks its peers (the other squares in its row,  its column, and its nonet), and removes their values from its candidates list.
// For example, if it finds that a square in the same row has 7 as its value, it would remove 7 from its list of candidates, because 7 is already taken.
// This method is invoked inside the constructCandidates() method.
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
  }
};

module.exports = Sudoku;
