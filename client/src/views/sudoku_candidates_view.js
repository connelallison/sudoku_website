"use strict";

const PubSub = require("../helpers/pub_sub.js");

const SudokuCandidatesView = function (container) {
  this.container = container
}

SudokuCandidatesView.prototype.render = function (data) {
  this.container.innerHTML = "";
  const grid = document.createElement("table");
  grid.innerHTML += "<colgroup> <col> <col> <col>";
  grid.innerHTML += "<colgroup> <col> <col> <col>";
  grid.innerHTML += "<colgroup> <col> <col> <col>";
  const tbody1 = document.createElement("tbody");
  const tbody2 = document.createElement("tbody");
  const tbody3 = document.createElement("tbody");
  grid.appendChild(tbody1);
  grid.appendChild(tbody2);
  grid.appendChild(tbody3);
  for (let i = 0, c = 0; i < 9; i++) {
    const gridRow = document.createElement("tr");
    for (let j = 0; j < 9; j++, c++) {
      const gridSquare = document.createElement("td");
      const nestedTable = document.createElement("table");
      nestedTable.classList.add("nested-table")
      for (let k = 0, d = 0; k < 3; k++) {
        const candidateGridRow = document.createElement("tr");
        for (let l = 0; l < 3; l++, d++) {
          const candidateGridSquare = document.createElement("td");
          candidateGridSquare.classList.add("candidate-square")
          let pencilMarkValue;
          let disabled;
          if (!data[i][j].includes(d)) {
            pencilMarkValue = "";
            disabled = 'disabled="true" ';
          } else {
            pencilMarkValue = d;
            disabled = "";
          }
          candidateGridSquare.innerHTML += `<input id="square-${c}-candidate-${d}" maxlength="1" size="1" value="${pencilMarkValue}"></input>`;
          candidateGridRow.appendChild(candidateGridSquare);
        }
        nestedTable.appendChild(candidateGridRow);
      }
      gridSquare.appendChild(nestedTable);
      gridRow.appendChild(gridSquare);
    }
    switch (i) {
      case 0:
      case 1:
      case 2:
        tbody1.appendChild(gridRow);
        break;
      case 3:
      case 4:
      case 5:
        tbody2.appendChild(gridRow);
        break;
      case 6:
      case 7:
      case 8:
        tbody3.appendChild(gridRow);
        break;
      default:
    }
  }
  this.container.appendChild(grid);
}

module.exports = SudokuCandidatesView;