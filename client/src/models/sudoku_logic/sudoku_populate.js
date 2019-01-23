"use strict";
const Sudoku = require("./sudoku_helpers.js");
const PubSub = require('../../helpers/pub_sub.js');





// This method is used to populate a blank sudoku puzzle with values passed in as a 2D rows array of numbers.
// It loops through each Square of each row of the sudoku puzzle, and sets its value property to the corresponding number in the 2D array passed in as an argument.
Sudoku.prototype.populate2dArray = function (rows) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      this.rows[x][y].value = rows[x][y];
    }
  }
  this.constructCandidates();
};

Sudoku.prototype.populateString = function (string) {
  for (let x = 0, s = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++, s++) {
      this.rows[x][y].value = parseInt(string[s]);
    }
  }
  this.constructCandidates();
}

Sudoku.prototype.populateApiRequest = function (filledSquares) {
  for (let i = 0; i < filledSquares.length; i++) {
    this.rows[filledSquares[i].x][filledSquares[i].y].value = filledSquares[i].value;
  }
  this.constructCandidates();
}

// This method is used to construct the starting candidate lists when a puzzle is populated. It loops through each Square object in each row, and invokes the checkPeers method on it.
Sudoku.prototype.constructCandidates = function () {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      this.setCandidatesToValue(this.rows[x][y]);
      this.checkPeers(this.rows[x][y]);
    }
  }
};

module.exports = Sudoku;
