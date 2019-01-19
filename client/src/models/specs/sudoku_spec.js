"use strict";

const assert = require('assert');
const Square = require("../sudoku_logic/square_constructor.js")
const Sudoku = require("../sudoku_solver.js");

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
let sudoku1;
let sudoku1complete;
let sudokuBlank;
let square1;
let square2;
let square3;

describe("Square Constructor", function () {
  beforeEach(function () {
    square1 = new Square(1, 2, 0);
    square2 = new Square(2, 2, 9);
    square3 = new Square(4, 5);
  });
  it("On construction, this.row, this.column, and this.value should be numbers determined by the parameters passed in", function () {
    assert.strictEqual(square1.row, 1);
    assert.strictEqual(square1.column, 2);
    assert.strictEqual(square1.value, 0);
    assert.strictEqual(square2.row, 2);
    assert.strictEqual(square2.column, 2);
    assert.strictEqual(square2.value, 9);
  });
  it("On construction, this.nonet should be set to the appropriate nonet corresponding to the row and column passed in", function () {
    assert.strictEqual(square1.nonet, 0);
    assert.strictEqual(square3.nonet, 4);
  });
  it("On construction, this.candidates should be set to an array of 1...9 in order", function () {
    assert.deepStrictEqual(square1.candidates, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("On construction, if no value is passed in, the parameter will default to 0", function () {
    assert.strictEqual(square3.value, 0);
  })
});
describe("Sudoku Constructor", function() {
  beforeEach(function() {
    sudoku1 = new Sudoku();
  });
  it("On construction, this.rows, this.columns, and this.nonets should each be a 9x9 2D array", function() {
    assert.strictEqual(sudoku1.rows.length, 9);
    assert.strictEqual(sudoku1.rows[8].length, 9);
    assert.strictEqual(sudoku1.columns.length, 9);
    assert.strictEqual(sudoku1.columns[8].length, 9);
    assert.strictEqual(sudoku1.nonets.length, 9);
    assert.strictEqual(sudoku1.nonets[8].length, 9);
  });
  it("On construction, the contents of this.rows, this.columns, and this.nonets should each be 81 Square objects with value 0", function() {
    assert.strictEqual(sudoku1.rows[8][8].value, 0);
    assert.strictEqual(sudoku1.columns[8][8].value, 0);
    assert.strictEqual(sudoku1.nonets[8][8].value, 0);
  });
  it("this.rows, this.columns, and this.nonets should all be pointing to the same 81 Square objects.", function() {
    assert.strictEqual(sudoku1.rows[8][8], sudoku1.columns[8][8]);
    assert.strictEqual(sudoku1.rows[8][8], sudoku1.nonets[8][8]);
    assert.strictEqual(sudoku1.columns[8][8], sudoku1.nonets[8][8]);
  });
  it("Altering an object by accessing it from one 2D arrays should change the object in the other two arrays as well", function () {
    assert.strictEqual(sudoku1.rows[8][8].value, 0);
    assert.strictEqual(sudoku1.columns[8][8].value, 0);
    assert.strictEqual(sudoku1.nonets[8][8].value, 0);
    sudoku1.rows[8][8].value = 1;
    assert.strictEqual(sudoku1.rows[8][8].value, 1);
    assert.strictEqual(sudoku1.columns[8][8].value, 1);
    assert.strictEqual(sudoku1.nonets[8][8].value, 1);
  });
  it("this.completed should be an array of 1...9 in ascending order", function () {
    assert.deepStrictEqual(sudoku1.completed, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("this.sudoku should be an array of this.rows, this.columns, and this.nonets", function () {
    assert.deepStrictEqual(sudoku1.sudoku, [sudoku1.rows, sudoku1.columns, sudoku1.nonets]);
  });
});
describe("Sudoku Helpers", function () {
  beforeEach(function () {
    sudoku1 = new Sudoku();
    sudoku1complete = new Sudoku();
    sudoku1.populate2dArray(sudoku1rows);
    sudoku1complete.populate2dArray(sudoku1completeRows);
  });
  it("this.unitNumbers() should take a unit as an input and return an array of the values of the Square objects inside the unit", function () {
    assert.deepStrictEqual(sudoku1.unitNumbers(sudoku1.rows[2]), sudoku1rows[2]);
  });
  it("this.unitsNumbers() should take an array of units as an input and return a 2D array of the values of the Square objects inside the input array", function () {
    assert.deepStrictEqual(sudoku1.unitsNumbers(sudoku1.rows), sudoku1rows);
  });
  it("this.unitComplete() should take a unit as an input. if the unit contains each of 1...9 exactly once, the method should return true - otherwise, it should return false", function () {
    assert.strictEqual(sudoku1.unitComplete(sudoku1.rows[0]), false);
    assert.strictEqual(sudoku1complete.unitComplete(sudoku1complete.rows[0]), true);
    assert.strictEqual(sudoku1.unitComplete(sudoku1.columns[2]), false);
    assert.strictEqual(sudoku1complete.unitComplete(sudoku1complete.columns[2]), true);
    assert.strictEqual(sudoku1.unitComplete(sudoku1.nonets[4]), false);
    assert.strictEqual(sudoku1complete.unitComplete(sudoku1complete.rows[4]), true);
  });
  it("this.sudokuComplete() should return true if the sudoku has been correctly completed, and false otherwise", function () {
    assert.strictEqual(sudoku1.sudokuComplete(), false);
    assert.strictEqual(sudoku1complete.sudokuComplete(), true);
  });
});
describe("Sudoku Populate", function () {
  beforeEach(function() {
    sudoku1 = new Sudoku();
    sudoku1complete = new Sudoku();
    // sudoku1.populate2dArray(sudoku1rows);
    // sudoku1complete.populate2dArray(sudoku1completeRows);
  });
  it("this.populate2dArray should taken in a 2D array of square values as an input, and populate the blank sudoku grid with the appropriate values", function () {
    assert.strictEqual(sudoku1.rows[1][0].value, 0);
    sudoku1.populate2dArray(sudoku1rows);
    assert.strictEqual(sudoku1.rows[1][0].value, 4);
  });
  it("after populating, the Square objects' candidate lists should have been updated to exclude any values contained inside a peer Square", function () {
    assert.deepStrictEqual(sudoku1.rows[0][5].candidates, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert.deepStrictEqual(sudoku1.rows[2][5].candidates, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert.deepStrictEqual(sudoku1.rows[1][1].candidates, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    sudoku1.populate2dArray(sudoku1rows);
    assert.deepStrictEqual(sudoku1.rows[0][5].candidates, [3]);
    assert.deepStrictEqual(sudoku1.rows[2][5].candidates, [2]);
    assert.deepStrictEqual(sudoku1.rows[1][1].candidates, [5, 6, 8]);
  })
})
