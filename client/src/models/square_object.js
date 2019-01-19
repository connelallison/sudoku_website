"use strict";

// This is the constructor for a Square object. It takes in a row as an x co-ordinate, a column as y co-ordinate, and a nonet (handled by the Sudoku object), and optionally takes a value.
// If no value is supplied, the default parameter is 0.
// The candidates property (the list of numbers that might be placed inside the square) is initalised as an array of the numbers 1...9.
// The Sudoku object will be responsible for eliminating possibilities from the array.

const Square = function (x, y, nonet, value = 0) {
  this.row = x;
  this.column = y;
  this.nonet = nonet;
  this.value = value;
  this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}


// // These lines test that the default parameter functions correctly, and the constructor works as intended.
// const testSquare1 = new Square(0, 0, 4);
// const testSquare2 = new Square(1, 3, 0);
// const testSquare3 = new Square(4, 5);
// console.log(testSquare1);
// console.log(testSquare2);
// console.log(testSquare3);

module.exports = Square;
