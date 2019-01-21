"use strict";

// This is the constructor for a Square object. It takes in a row as an x co-ordinate, a column as y co-ordinate, and optionally takes a value.
// If no value is supplied, the default parameter is 0.
// this.nonet is determined from the row and column, using the nonetFromXY() method.
// The candidates property (the list of numbers that might be placed inside the square) is initalised as an array of the numbers 1...9.
// The Sudoku object will be responsible for eliminating possibilities from the array.

const Square = function (x, y, value = 0) {
  this.row = x;
  this.column = y;
  this.nonet = this.nonetFromXY(this.row, this.column);
  this.nonetIndex = this.nonetIndexFromXY(this.row, this.column);
  this.peers = this.setPeers();
  this.value = value;
  this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

// This method takes in a row index and a column index, and returns the nonet index of the square in which they intersect.
// It is invoked inside the constructor to determine the nonet of the Square, based on its row and column.
Square.prototype.nonetFromXY = function (row, column) {
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

Square.prototype.nonetIndexFromXY = function (row, column) {
  let rowType = row%3;
  let columnType = column%3;
  switch (rowType) {
    case 0:
      switch (columnType) {
        case 0:
          return 0;
          break;
        case 1:
          return 1;
          break;
        case 2:
          return 2;
          break;
        default:
          return new Error(`Error - only 0...8 are valid column indices. ${column} is not valid.`);
          break;
      }
    case 1:
    switch (columnType) {
      case 0:
        return 3;
        break;
      case 1:
        return 4;
        break;
      case 2:
        return 5;
        break;
      default:
        return new Error(`Error - only 0...8 are valid column indices. ${column} is not valid.`);
        break;
    }
    case 2:
    switch (columnType) {
      case 0:
        return 6;
        break;
      case 1:
        return 7;
        break;
      case 2:
        return 8;
        break;
      default:
        return new Error(`Error - only 0...8 are valid column indices. ${column} is not valid.`);
        break;    }
    default:
      return new Error(`Error - only 0...8 are valid row indices. ${row} is not valid.`);
      break;
  }
};

Square.prototype.setPeers = function () {
  let peers = [];
  for (let i = 0; i < 9; i++) {
    peers.push([this.row, i]);
  }
  for (let i = 0; i < 9; i++) {
    peers.push([i, this.column]);
  }
  peers = peers.concat(this.nonetCoords());
  peers = peers.filter((peer) => {
    return peer[0] !== this.row || peer[1] !== this.column;
  });
  peers = [...new Set(peers)];
  return peers;
}

Square.prototype.nonetCoords = function () {
  const row = Math.floor(this.row/3)*3;
  const column = Math.floor(this.column/3)*3;
  const rows = [row, row+1, row+2];
  const columns = [column, column+1, column+2];
  const coords = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      coords.push([rows[i], columns[j]]);
    }
  }
  return coords;
}

// // These lines test that the default parameter functions correctly, and the constructor works as intended.
// const testSquare1 = new Square(0, 0, 4);
// const testSquare2 = new Square(1, 3, 0);
// const testSquare3 = new Square(4, 5);
// console.log(testSquare1);
// console.log(testSquare2);
// console.log(testSquare3);

module.exports = Square;
