"use strict";

const Square = function (x, y, nonet, value = 0) {
  this.row = x;
  this.column = y;
  this.nonet = nonet;
  this.value = value;
  if (value === 0) {
    this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  } else {
    this.candidates = [this.value];
  }
}

module.exports = Square;
